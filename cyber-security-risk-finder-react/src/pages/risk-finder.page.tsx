//#region IMPORTS

import { useState } from 'react'
import FetchRiskResponse from '../models/fetch-risk-response.model'
import { getAllRisk, getRisksByKeyword } from '../services/risk-api.service'
import { Box, Button, Typography } from '@mui/material'
import CustomTable from '../components/organisms/CustomTable'
import { riskGridColumns } from '../utils/risk-grid-columns'
import { useQuery } from '@tanstack/react-query'
import IPagination from '../models/pagination.model'
import Add from '@mui/icons-material/Add'
import { TOrder } from '../utils/order'
import IRiskModel from '../models/risk.model'

//#endregion

const RiskFinderPage = () => {

  //#region USE STATE

  const [risks, setRisks] = useState<FetchRiskResponse>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limitPerPage, setLimitPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string | undefined>("")
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState<TOrder>('asc')

  //#endregion

  const fetchRisks = async (): Promise<FetchRiskResponse> => {
    let response: FetchRiskResponse = {}
    const pagination: IPagination = {
      page: currentPage ?? 1,
      limit: limitPerPage ?? 10,
      orderBy,
      order
    }

    if (search != undefined && search.length > 0)
      response = await getRisksByKeyword(search, pagination)
    else
      response = await getAllRisk(pagination)

    setRisks(response)

    return response
  }

  const queryResponse = useQuery<FetchRiskResponse, Error>(
    {
      queryKey: ["risks", currentPage, search, orderBy, order],
      queryFn: fetchRisks,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )

  const HeaderComponent = (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4" alignItems="center">
        {import.meta.env.VITE_APP_TITLE}
      </Typography>
      <Button variant="outlined" startIcon={<Add />}>New</Button>
    </Box>
  )

  //#region Handles

  const onClickRowHandle = (cell: any, row: any) => {
    console.log({ cell, row });
  }

  const onSortHandler = (column: string) => {
    console.log('column', column)
    console.log('order', order)
    setOrderBy(column)
    setOrder(order == 'asc' ? 'desc' : 'asc')
  }

  //#endregion

  const getRiskData = (): IRiskModel[] | undefined => {
    if (risks == undefined || risks.data == undefined || risks.data.length == 0)
      return undefined

    return risks.data[0].rows
  }

  return <>
    <Box padding={6}>
      {
        risks &&
        <CustomTable
          data={getRiskData() ?? []}
          columns={riskGridColumns}
          pageCount={risks.totalPages}
          searchLabel="Search by keyword"
          isFetching={queryResponse.isFetching}
          orderBy={orderBy}
          order={order}
          page={setCurrentPage}
          search={setSearch}
          onClickRow={onClickRowHandle}
          onSort={onSortHandler}
        />
      }
    </Box>
  </>
}

export default RiskFinderPage