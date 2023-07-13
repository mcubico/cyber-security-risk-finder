import IFeatureModel from "./features.model"

export default interface IRiskModel {
  risk: string
  description: string
  features: IFeatureModel
}