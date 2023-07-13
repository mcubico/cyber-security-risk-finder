import IUserModel from "../models/user.model"
import IApiResponse from "./api-response.type"

export default interface IUserMeResponse extends Omit<IApiResponse, 'data'> {
  data?: IUserModel
}