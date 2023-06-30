import { useState } from 'react';
import SearchBar from '../components/molecules/SearchBar'
import FetchRiskResponse from '../models/fetch-risk-response.model'
import { getAllRisk, getRisksByKeyword } from '../services/risk-api.service';
import { Box, Button, Typography } from '@mui/material';
import CustomTable from '../components/organisms/CustomTable';
import { riskGridColumns } from '../utils/risk-grid-columns';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../models/pagination.model';

const HomePage = () => {
  const [risks, setRisks] = useState<FetchRiskResponse>()
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limitPerPage, setLimitPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string | undefined>("")


  const fetchRisks = async () => {
    let response: FetchRiskResponse = {}
    const pagination: Pagination = { page: currentPage ?? 1, limit: limitPerPage ?? 10 }
    if (search != undefined && search.length > 0)
      response = await getRisksByKeyword(search, pagination)
    else
      response = await getAllRisk(pagination)

    setRisks(response)

    return response
  }

  const queryResponse =
    useQuery<FetchRiskResponse, Error>(
      ["risks", currentPage, search], fetchRisks,
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      }
    )

  const Header = (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4" alignItems="center">
        User Table
      </Typography>
      <Button>Action Button</Button>
    </Box>
  );

  const onClickRow = (cell: any, row: any) => {
    console.log({ cell, row });
  }

  const onSearchHandle = (keyword: string): void => {
    setQuery(keyword)
    console.log('query :>> ', query)
    //TODO: Look up the risks using service
    //TODO: Assign risks to the status variable
  }

  return <>
    <SearchBar onSearchHandle={onSearchHandle} />

    <Box padding={6}>
      {
        risks &&
        <CustomTable
          data={risks.data ?? []}
          columns={riskGridColumns}
          isFetching={queryResponse.isFetching}
          onClickRow={onClickRow}
          pageCount={risks.totalPages}
          page={setCurrentPage}
          search={setSearch}
          headerComponent={Header}
          searchLabel="Search by keyword"
        />
      }
    </Box>
  </>
}

export default HomePage