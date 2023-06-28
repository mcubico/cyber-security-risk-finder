import FetchRiskResponse from "../models/fetch-risk-response.model";
import Risk from "../models/risk.model";
import axiosInstance from "../utils/axios-instance";
import axios from 'axios';

export const getRisks = async (): Promise<FetchRiskResponse> => {
  try {
    const response = await axiosInstance.get<FetchRiskResponse>(`/${import.meta.env.VITE_API_RISKS_ENDPOINT}`)
    const data = response.data as Risk[]
    const risks = data.map((risk: Risk): Risk => {
      if (Array.isArray(risk.features))
        risk.features = risk.features[0]
      
      return risk
    })
    
    console.log('getRisks > risks :>> ', risks)
    
    return {
      status: response.status,
      data: risks
    }
  } catch (error) {
    const response: FetchRiskResponse = {
      status: 501,
      message: 'Error'
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
