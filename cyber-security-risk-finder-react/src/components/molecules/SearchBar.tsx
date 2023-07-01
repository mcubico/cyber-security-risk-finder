//#region IMPORTS

import { FC, useRef } from 'react';
import {
  Box,
  Container,
  IconButton,
  TextField,
  TextFieldProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//#endregion

type TSearchBar = {
  onSearchHandle(keyword: string): void
}

const SearchBar: FC<TSearchBar> = (data) => {
  const searchRefInput = useRef<TextFieldProps>()

  const setKeywordSearchHandle = (): void => {
    const keyword: string = searchRefInput?.current?.value as string
    data.onSearchHandle(keyword)
  }

  return <>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form>
          <TextField
            id="search-bar"
            className="text"
            onChange={setKeywordSearchHandle}
            label="Enter a keyword"
            variant="outlined"
            placeholder="Search..."
            size="small"
            inputRef={searchRefInput}
          />
          <IconButton
            type="submit"
            aria-label="search"
            onClick={setKeywordSearchHandle}
          >
            <SearchIcon />
          </IconButton>
        </form>
      </Box>
    </Container>
  </>
}

export default SearchBar