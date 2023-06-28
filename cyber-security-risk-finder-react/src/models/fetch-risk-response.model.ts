import ApiResponse from "./api-response.model";
import Risk from "./risk.model";

export default interface FetchRiskResponse extends ApiResponse {
  data?: Risk[]
}