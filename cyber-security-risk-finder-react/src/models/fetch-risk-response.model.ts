import IApiResponse from "../types/api-response.type"
import IRiskModel from "./risk.model"

export interface dataRisk {
  count?: number,
  rows?: IRiskModel[],
}

export default interface FetchRiskResponse extends IApiResponse {
  data?: dataRisk[]
  totalItems?: number
  totalPages?: number
}