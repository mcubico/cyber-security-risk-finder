import pymongo
from flask import Flask, request, jsonify, make_response
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from pymongo import MongoClient
from urllib.parse import quote_plus
from markupsafe import escape
import datetime
import hashlib

from pymongo.errors import DuplicateKeyError, ConnectionFailure

app = Flask(__name__)

# Initialize connection to db
protocol = 'mongodb+srv'
username = quote_plus('mcubico')
password = quote_plus('iWqfcqc7QJHRAMqD')
cluster = 'clustercybersecurityris'
hostname = 'yx2qthd.mongodb.net'
database = 'CyberSecurityRisks'
uri = f'{protocol}://{username}:{password}@{cluster}.{hostname}/{database}?retryWrites=true&w=majority'

client = MongoClient(uri)

db = client[database]
risks_collection = db['Risks']
users_collection = db['Users']

# initialize JWTManager
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = '9da06b778ddf921de7358a56b3b59ebc'
# define the life span of the token
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=15)


@app.route('/api/v1/ping')
def ping():
    return jsonify({'msg': 'Hello, I am alive'}), 200


@app.route("/api/v1/users", methods=["POST"])
@jwt_required()
def register():
    try:
        # Getting the user from access token
        username_from_jwt = get_jwt_identity()
        user_from_db = get_user_by_username(username_from_jwt)

        if not user_from_db:
            return jsonify({'error': 'Access Token Expired'}), 404

        # store the json body request
        payload = request.get_json()

        # Creating Hash of password and encrypt it to store in the database
        payload["password"] = encrypt_password(payload['password'])

        # If not exists than create one
        if user_exists(payload["username"]):
            return jsonify({'error': 'Username already exists'}), 409

        # Creating user
        users_collection.insert_one(payload)
        return jsonify({'msg': 'User created successfully'}), 201
    except Exception as e:
        app.logger.error(e)
        return jsonify({'error': 'Unexpected error'}), 500


@app.route("/api/v1/login", methods=["POST"])
def login():
    try:
        # Getting the login details from payload
        payload = request.get_json()

        user_from_db = get_user_by_username(payload['username'])
        if not user_from_db:
            return jsonify({'error': 'The username or password is incorrect'}), 401

        # Check if password is correct
        encrypted_password = encrypt_password(payload['password'])
        if encrypted_password == user_from_db['password']:
            # Create JWT Access Token
            access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
            # Return Token
            return jsonify(access_token=access_token), 200

        return jsonify({'error': 'The username or password is incorrect'}), 401
    except Exception as e:
        app.logger.error(e)
        return jsonify({'error': 'Unexpected error'}), 500


@app.route("/api/v1/risks", methods=["POST"])
@jwt_required()
def create_risk():
    """
    Creating the risk
    :return:
        dict: Return the risk and feature created
    """

    try:
        # Getting the user from access token
        username_from_jwt = get_jwt_identity()
        user_from_db = get_user_by_username(username_from_jwt)

        if not user_from_db:
            return jsonify({'error': 'Access Token Expired'}), 404

        # Getting the risk details from json
        payload = request.get_json()

        # Viewing if risk already present in collection
        risk_title = payload["risk"].lower()
        risk_from_db = risks_collection.find_one({'risk': risk_title})
        if risk_from_db:
            return jsonify({'error': 'Risk already exists on your profile'}), 404

        risk_id = risks_collection.insert_one(payload).inserted_id

        return jsonify({'msg': 'Risk created successfully'}), 201
    except Exception as e:
        app.logger.error(e)
        return jsonify({'error': 'Unexpected error'}), 500


@app.route("/api/v1/risks/<int:risk_id>", methods=["PUT"])
@jwt_required()
def update_risk(risk_id):
    try:
        # Getting the user from access token
        username_from_jwt = get_jwt_identity()
        user_from_db = get_user_by_username(username_from_jwt)

        if not user_from_db:
            return jsonify({'error': 'Access Token Expired'}), 404

        # Getting the risk details from json
        payload = request.get_json()

        result = risks_collection.find_one_and_update({'_id': risk_id}, {'$set', {'active': payload['active']}})

        return jsonify({'msg': 'Risk updated successfully', 'data': result}), 200
    except Exception as e:
        app.logger.error(e)
        return jsonify({'error': 'Unexpected error'}), 500


@app.route('/api/v1/risks', methods=['GET'])
@jwt_required()
def fetch_risks():
    try:
        # Getting the user from access token
        username_from_jwt = get_jwt_identity()
        user_from_db = get_user_by_username(username_from_jwt)

        if not user_from_db:
            return jsonify({'error': 'Access Token Expired'}), 404

        page = int(request.args.get(key="page", default=1))
        limit = int(request.args.get(key="limit", default=3))
        order_by = request.args.get(key="order_by", default='risk')
        order_desc = request.args.get(key="order", default=pymongo.ASCENDING)

        risks = list(
            risks_collection.find({}, {'active': 0})
            .sort(key_or_list=order_by, direction=order_desc)
            .skip(skip=limit * (page - 1))
            .limit(limit=limit)
        )

        response = make_response(jsonify({"data": risks}), 200)
        response.headers['x-total-count'] = risks_collection.count_documents({})

        return response
    except Exception as e:
        app.logger.error(e)
        return jsonify({'error': 'Unexpected error'}), 500


@app.errorhandler(404)
def resource_not_found(e):
    """
    An error-handler to ensure that 404 errors are returned as JSON.
    """
    return jsonify(error=str(e)), 404


@app.errorhandler(DuplicateKeyError)
def resource_not_found(e):
    """
    An error-handler to ensure that MongoDB duplicate key errors are returned as JSON.
    """
    return jsonify(error=f"Duplicate key error."), 400


def user_exists(username):
    doc = get_user_by_username(username)
    return doc is not None


def get_user_by_username(username):
    return users_collection.find_one({"username": escape(username)})


def encrypt_password(password):
    return hashlib.sha256(password.encode("utf-8")).hexdigest()
