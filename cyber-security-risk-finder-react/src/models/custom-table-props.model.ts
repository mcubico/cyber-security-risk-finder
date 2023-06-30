/* eslint-disable @typescript-eslint/no-explicit-any */

import { Cell, ColumnDef, Row } from "@tanstack/react-table";

export default interface CustomTableProps {
  data: any[]
  columns: ColumnDef<any>[],
  isFetching?: boolean;
  skeletonCount?: number;
  skeletonHeight?: number;
  headerComponent?: JSX.Element;
  pageCount?: number;
  page?: (page: number) => void;
  search?: (search: string) => void;
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
  searchLabel?: string;
}