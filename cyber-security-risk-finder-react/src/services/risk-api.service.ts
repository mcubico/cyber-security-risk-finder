//#region IMPORTS

import axios from "axios"
import FetchRiskResponse, { dataRisk } from "../models/fetch-risk-response.model"
import IPagination from "../models/pagination.model"
import IRiskModel from "../models/risk.model"
import axiosInstance from "../utils/axios-instance"

//#endregion

const API_RISKS_ENDPOINT = import.meta.env.VITE_API_RISKS_ENDPOINT
const X_TOTAL_COUNT_HEADER = 'x-total-count'

export const getAllRisk = async (pagination?: IPagination): Promise<FetchRiskResponse> => {
  try {
    const paginationQuery = makePaginationQuery(pagination)
    const endpoint = `/${API_RISKS_ENDPOINT}?${paginationQuery}`
    const response = await axiosInstance.get<FetchRiskResponse>(endpoint)
    const data = response.data.data as dataRisk[]
    const risks = data[0].rows?.map((risk: IRiskModel): IRiskModel => {
      if (Array.isArray(risk.features))
        risk.features = risk.features[0]

      return risk
    })

    const totalCount: number = response.headers[X_TOTAL_COUNT_HEADER] ?? data[0]?.count
      Number(response.headers[X_TOTAL_COUNT_HEADER]) === 0
        ? 1
        : Number(response.headers[X_TOTAL_COUNT_HEADER])
    const totalPages: number = getTotalPages(totalCount, pagination)

    console.log('getRisks > endpoint >> ', endpoint)
    console.log('getRisks > response.headers >> ', response.headers[X_TOTAL_COUNT_HEADER])
    console.log('getRisks > response.data >> ', risks)
    console.log('getRisks > totalCount >> ', totalCount)
    console.log('getRisks > totalPages >> ', totalPages)

    return {
      status: response.status,
      data,
      totalItems: totalCount,
      totalPages
    }
  } catch (error) {
    const response: FetchRiskResponse = {
      status: 501,
      message: 'Error',
    }

    if (axios.isAxiosError(error)) {
      response.status = error.status
      response.error = true
    } else {
      console.error(error);
    }

    return response
  }
}

export const getRisksByKeyword = async (keyword: string, pagination?: IPagination): Promise<FetchRiskResponse> => {
  try {
    const paginationQuery = makePaginationQuery(pagination)
    const endpoint = `/${API_RISKS_ENDPOINT}?query=${keyword}&${paginationQuery}`
    const response = await axiosInstance.get<FetchRiskResponse>(endpoint)
    const data = response.data.data as dataRisk[]
    const risks = data[0].rows?.map((risk: IRiskModel): IRiskModel => {
      if (Array.isArray(risk.features))
        risk.features = risk.features[0]

      return risk
    })

    const totalCount: number =
      Number(response.headers[X_TOTAL_COUNT_HEADER]) === 0
        ? 1
        : Number(response.headers[X_TOTAL_COUNT_HEADER])
    const totalPages: number = getTotalPages(totalCount, pagination)

    console.log('getRisksByKeyword > keyword >> ', keyword)
    console.log('getRisksByKeyword > endpoint >> ', endpoint)
    console.log('getRisksByKeyword > response.headers >> ', response.headers)
    console.log('getRisksByKeyword > response.data >> ', risks)
    console.log('getRisks > totalCount >> ', totalCount)
    console.log('getRisksByKeyword > totalPages >> ', totalPages)

    return {
      status: response.status,
      data,
      totalItems: totalCount,
      totalPages
    }
  } catch (error) {
    const response: FetchRiskResponse = {
      status: 501,
      message: 'Error',
    }

    if (axios.isAxiosError(error)) {
      response.status = error.status
      response.error = error.message
    } else {
      console.error(error);
    }

    return response
  }
}

const getTotalPages = (totalCount: number, pagination?: IPagination): number =>
  pagination != undefined ? Math.ceil(totalCount / pagination.limit) : 0

const makePaginationQuery = (pagination?: IPagination): string => {
  if (pagination == undefined)
    return ''

  let paginationQuery = `page=${pagination.page}&limit=${pagination.limit}`

  if (pagination.orderBy != undefined && pagination.orderBy.length > 0)
    paginationQuery += `&order_by=${pagination.orderBy.replace('features_', '')}&order=${pagination.order}`

  return paginationQuery
}
