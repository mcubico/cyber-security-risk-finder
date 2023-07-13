//#region IMPORTS

import axios from "axios"
import axiosInstance from "../utils/axios-instance"
import IUserModel from "../models/user.model"
import LoginResponse from "../types/login-response.type"
import ILoginResponse from "../types/login-response.type";
import { LoginInput } from "../pages/login.page";
import IUserMeResponse from "../types/user-me-response.type";
import IApiResponse from "../types/api-response.type";

//#endregion

export const loginUserFn = async (user: LoginInput) => {
  console.log('loginUser > endpoint >> ', import.meta.env.VITE_API_LOGIN_ENDPOINT)

  const apiResponse = await axiosInstance.post<LoginResponse>(import.meta.env.VITE_API_LOGIN_ENDPOINT, user)
  const response = apiResponse.data

  console.log('loginUser > response.data >> ', response)
  return response
}

export const logoutUserFn = async () => {
  console.log('loginUser > endpoint >> ', import.meta.env.VITE_API_LOGOUT_ENDPOINT)

  const apiResponse = await axiosInstance.post<IApiResponse>(import.meta.env.VITE_API_LOGOUT_ENDPOINT)
  const response = apiResponse.data

  console.log('loginUser > response.data >> ', response)
  return response.data
}

export const getMeFn = async () => {
  console.log('getMe > endpoint >> ', import.meta.env.VITE_API_USERS_ME_ENDPOINT)

  const apiResponse = await axiosInstance.get<IUserMeResponse>(import.meta.env.VITE_API_USERS_ME_ENDPOINT)
  const response = apiResponse.data

  console.log('getMe > response.data >> ', response)

  return response
}

export const refreshAccessToken = async () => {
  console.log('refreshAccessToken > endpoint >> ', import.meta.env.VITE_API_TOKEN_REFRESH_ENDPOINT)

  const apiResponse = await axiosInstance.get<ILoginResponse>(import.meta.env.VITE_API_TOKEN_REFRESH_ENDPOINT)
  const response = apiResponse.data

  console.log('refreshAccessToken > response.data >> ', apiResponse)

  return response.data?.access_token
}

export const login = async (user: IUserModel): Promise<LoginResponse> => {
  try {
    const apiResponse = await axiosInstance.post<LoginResponse>(import.meta.env.VITE_API_LOGIN_ENDPOINT, user)
    const response = apiResponse.data

    console.log('login > endpoint >> ', import.meta.env.VITE_API_LOGIN_ENDPOINT)
    console.log('login > response.data >> ', response)

    return response
  } catch (error) {
    const response: LoginResponse = {
      status: 501,
      message: 'Error',
    }

    if (axios.isAxiosError(error)) {
      response.message = error.message
      response.error = true
    } else {
      console.error(error);
    }

    return response
  }
}
