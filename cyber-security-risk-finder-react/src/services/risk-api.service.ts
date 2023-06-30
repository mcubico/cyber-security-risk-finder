import axios from "axios"
import FetchRiskResponse from "../models/fetch-risk-response.model"
import Pagination from "../models/pagination.model"
import Risk from "../models/risk.model"
import axiosInstance from "../utils/axios-instance"

const API_RISKS_ENDPOINT: string = import.meta.env.VITE_API_RISKS_ENDPOINT
const X_TOTAL_COUNT_HEADER = 'x-total-count'

export const getAllRisk = async (pagination?: Pagination): Promise<FetchRiskResponse> => {
  try {
    const paginationQuery = pagination != undefined
      ? `&_page=${pagination.page}&_limit${pagination.limit}`
      : ''
    const endpoint = `/${API_RISKS_ENDPOINT}${paginationQuery}`
    const response = await axiosInstance.get<FetchRiskResponse>(endpoint)
    const data = response.data as Risk[]
    const risks = data.map((risk: Risk): Risk => {
      if (Array.isArray(risk.features))
        risk.features = risk.features[0]

      return risk
    })

    const totalCount: number = Number(response.headers[X_TOTAL_COUNT_HEADER]) === 0
      ? 1
      : Number(response.headers[X_TOTAL_COUNT_HEADER])
    const totalPages: number = getTotalPages(totalCount, pagination)

    console.log('getRisks > endpoint >> ', endpoint);
    console.log('getRisks > response.headers >> ', response.headers)
    console.log('getRisks > response.data >> ', risks)
    console.log('getRisks > totalCount >> ', totalCount)
    console.log('getRisks > totalPages >> ', totalPages)

    return {
      status: response.status,
      data: risks,
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

export const getRisksByKeyword = async (keyword: string, pagination?: Pagination): Promise<FetchRiskResponse> => {
  try {
    const paginationQuery = pagination != undefined
      ? `&q=${keyword}&_page=${pagination.page}&_limit${pagination.limit}`
      : ''
    const endpoint = `/${API_RISKS_ENDPOINT}${paginationQuery}`
    const response = await axiosInstance.get<FetchRiskResponse>(endpoint)
    const data = response.data as Risk[]
    const risks = data.map((risk: Risk): Risk => {
      if (Array.isArray(risk.features))
        risk.features = risk.features[0]

      return risk
    })
    
    const totalCount: number = Number(response.headers[X_TOTAL_COUNT_HEADER]) === 0
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
      data: risks,
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

const getTotalPages = (totalCount: number, pagination?: Pagination): number =>
  pagination != undefined ? Math.ceil(totalCount / pagination.limit) : 0
