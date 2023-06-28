import { useEffect, useState } from 'react';
import SearchBar from '../components/molecules/SearchBar'
import FetchRiskResponse from '../models/fetch-risk-response.model'
import { getRisks } from '../services/risk-api.service';
import { Box } from '@mui/material';
import CustomTable from '../components/organisms/CustomTable';
import { riskGridColumns } from '../utils/risk-grid-columns';

const HomePage = () => {
  const [query, setQuery] = useState('')
  const [risks, setRisks] = useState<FetchRiskResponse>()

  // Effect to get all risks when page is loaded
  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    const response = await getRisks()
    setRisks(response)
  };

  //TODO: Make a useEffect to update view when risks change

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
        risks && <CustomTable data={risks.data ?? []} columns={riskGridColumns} />
      }
    </Box>
  </>
}

export default HomePage