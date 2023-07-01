/* eslint-disable @typescript-eslint/no-explicit-any */

import { Cell, ColumnDef, Row } from "@tanstack/react-table";
import { TOrder } from "../utils/order";

export default interface CustomTableProps {
  data: any[]
  columns: ColumnDef<any>[]
  isFetching?: boolean
  skeletonCount?: number
  skeletonHeight?: number
  headerComponent?: JSX.Element
  pageCount?: number
  searchLabel?: string
  orderBy?: string,
  order?: TOrder,
  page?: (page: number) => void
  search?: (search: string) => void
  onSort?: (columnId: string, order?: TOrder) => void
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void
}