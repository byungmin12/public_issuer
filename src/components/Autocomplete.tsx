import React, { useEffect, useRef, useState } from 'react'
import { OctokitResponse } from '@octokit/types'
import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  debounce,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import useRepositories from '../stores/useRepositories'
import { IRepositoryResType } from '../types/repository'
import octokit from '../apis/octokit'
import { glassmorphismStr } from '../styles/Glassmorphism'
import useInfiniteScroll from '../hooks/useInfiniteScroll'


const StyledAutocomplete = styled(MuiAutocomplete<IRepositoryResType>)`
  ${() => glassmorphismStr({})}
  background: rgba(255, 255, 255, 0.11);

  & .MuiFormControl-root, & .MuiOutlinedInput-notchedOutline, & {
    border-radius: 12px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  & .MuiFormLabel-root, input {
    color: #fff;
  }

  & .Mui-disabled {
    color: red !important;
  }
`

const StyledPaper = styled(Paper)`
  background: rgba(255, 255, 255, 1);

  & ul {
    li {
      color: black;
    }
  }
`

function Autocomplete() {
  const [input, setInput] = useState('')
  const [options, setOptions] = useState<IRepositoryResType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const prevInputRef = useRef<string>();
  const { handlerStoreRepositories: handlerStoreRepository, repositories } = useRepositories(state => state)

  const handlerChangeOptions = (e: React.SyntheticEvent<Element, Event>, value: IRepositoryResType | null) => {
    if (value === null) return
    handlerStoreRepository(value)
  }

  const updateInput = React.useMemo(
    () =>
      debounce(
        async (
          request: { input: string },
        ) => {
          setIsLoading(true)

          const data: OctokitResponse<{ total_count: number; items: IRepositoryResType[] }, number> = await octokit.request('GET /search/repositories{?q,per_page,page}', {
            q: request.input,
            per_page: 300,
            page: pageNumber,
          })

          if (data.status === 200) {
            prevInputRef.current = request.input
            setOptions((prev) => [...prev, ...data.data.items])

            setIsLoading(false)
          }

        },
        400,
      ),
    [pageNumber],
  )

  const { lastPostRef } = useInfiniteScroll<HTMLLIElement>({
    isLoading, cb: () => {
      setPageNumber((prev) => prev + 1)
    }, deps: [],
  })

  useEffect(() => {
    if (input === '') return
    if(prevInputRef.current !== input){
      setPageNumber(1)
    }
    // eslint-disable-next-line
    updateInput({ input })

  }, [input, updateInput, pageNumber])

  return (
    <StyledAutocomplete
      options={options}
      loading={isLoading}
      loadingText='Loading...'
      PaperComponent={StyledPaper}
      filterOptions={(x) => x}
      getOptionLabel={(option) => repositories.length >= 4 ? '' : option.name}
      onInputChange={(e, value) => {
        setInput(value)
      }}
      onChange={handlerChangeOptions}
      renderInput={(params) => <TextField
        {...params}
        label={repositories.length >= 4 ? 'Delete Repositories' : 'Search Repositories'}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <div>
              {isLoading ? <CircularProgress color='inherit' size={20} /> : params.InputProps.endAdornment}
            </div>
          ),
        }}
      />}
      renderOption={(props, option) => {

        if (option.html_url === options[options.length - 1].html_url) {
          return (
            <li ref={lastPostRef}  {...props} key={`${option.id}-${option.full_name}-${option.html_url}`}>
              <Grid container alignItems='center'>
                <Typography variant='body2' color='text.secondary'>
                  {option.full_name}
                </Typography>
              </Grid>
            </li>
          )
        }

        return <li  {...props} key={`${option.id}-${option.full_name}-${option.html_url}`}>
          <Grid container alignItems='center'>
            <Typography variant='body2' color='text.secondary'>
              {option.full_name}
            </Typography>
          </Grid>
        </li>
      }
      }
      disabled={repositories.length >= 4}
      fullWidth
      disablePortal
    />
  )
}

export default Autocomplete