import Features from "./features.model"

export default interface Risk {
  id: number
  risk: string
  description: string
  features: Features
}