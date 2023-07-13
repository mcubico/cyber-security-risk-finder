export default interface IPagination {
  page: number
  limit: number
  orderBy?: string
  order?: string
}