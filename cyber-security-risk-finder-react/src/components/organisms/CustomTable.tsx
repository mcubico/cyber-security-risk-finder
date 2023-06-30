/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChangeEvent, FC, memo, useMemo, useState } from "react"
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TextField,
  Skeleton,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomTableProps from "../../models/custom-table-props.model";
import { StyledPagination, StyledTableRow } from "../../utils/custom-table-styles";
import { debounce } from "lodash";

const CustomTable: FC<CustomTableProps> = memo((props: CustomTableProps) => {

  const skeletonCount: number = props.skeletonCount ?? 10
  const searchLabel = props.searchLabel ?? 'Search'

  const [paginationPage, setPaginationPage] = useState(1)

  const memoizedData = useMemo(() => props.data, [props.data])

  const memoizedColumns = useMemo(() => props.columns, [props.columns])

  const memoisedHeaderComponent =
    useMemo(
      () => props.headerComponent,
      [props.headerComponent]
    )

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: props.pageCount,
  })

  const skeletons = Array.from({ length: skeletonCount }, (_x, i) => i)

  const columnCount = getAllColumns().length

  const noDataFound = !props.isFetching && (!memoizedData || memoizedData.length === 0)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    searchLabel && props.search?.(e.target.value)

  const handlePageChange = (_event: ChangeEvent<unknown>, currentPage: number) => {
    setPaginationPage(currentPage === 0 ? 1 : currentPage);
    props.page?.(currentPage === 0 ? 1 : currentPage);
  }

  const TableHeadComponent = (): JSX.Element[] => (
    getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {
          headerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {
                header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
              }
            </TableCell>
          ))
        }
      </TableRow>
    ))
  )

  const TableBodyComponent = (): JSX.Element[] => (
    getRowModel().rows.map((row) => (
      <StyledTableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell
            onClick={() => props.onClickRow?.(cell, row)}
            key={cell.id}
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </TableCell>
        ))}
      </StyledTableRow>
    ))
  )

  const TableLoadingComponent = (): JSX.Element[] => (
    skeletons.map((skeleton) => (
      <TableRow key={skeleton}>
        {
          Array.from({ length: columnCount }, (_x, i) => i).map(
            (elm) => (
              <TableCell key={elm}>
                <Skeleton height={props.skeletonHeight} />
              </TableCell>
            )
          )
        }
      </TableRow>
    ))
  )

  const NoDataFoundComponent = (): JSX.Element => (
    <Box my={2} textAlign="center">
      No Data Found
    </Box>
  )

  const PaginationComponent = (): JSX.Element => (
    <StyledPagination
      count={props.pageCount}
      page={paginationPage}
      onChange={handlePageChange}
      color="primary"
    />
  )

  const SearchComponent = (): JSX.Element => (
    <TextField
      onChange={debounce(handleSearchChange, 1000)}
      size="small"
      label={searchLabel}
      margin="normal"
      variant="standard"
    />
  )

  return (
    <Paper elevation={2} style={{ padding: "1rem 0px" }}>
      <Box paddingX="1rem">
        {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
        {props.search && SearchComponent()}
      </Box>
      <Box style={{ overflowX: "auto" }}>
        <MuiTable >
          <TableHead>
            {
              !props.isFetching && TableHeadComponent()
            }
          </TableHead>
          <TableBody>
            {
              !props.isFetching
                ? TableBodyComponent()
                : TableLoadingComponent()
            }
          </TableBody>
        </MuiTable>
      </Box>
      {noDataFound && NoDataFoundComponent()}
      {props.pageCount && props.page && PaginationComponent()}
    </Paper>
  )
})

export default CustomTable