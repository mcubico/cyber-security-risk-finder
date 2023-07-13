import IApiResponse from "./api-response.type"

type TAccessToken = {
  access_token: string
}

export default interface ILoginResponse extends Omit<IApiResponse, 'data'> {
  data?: TAccessToken
}