import React, { useEffect, useState } from 'react'
import { OctokitResponse } from '@octokit/types'
import { Autocomplete as MuiAutocomplete, debounce, Grid, Paper, styled, TextField, Typography } from '@mui/material'
import useRepositories from '../stores/useRepositories'
import { IRepositoryResType } from '../types/repository'
import octokit from '../apis/octokit'
import { glassmorphismStr } from '../styles/Glassmorphism'


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

  const handlerStoreRepository = useRepositories(state => state.handlerStoreRepositories)

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
          const data: OctokitResponse<{ total_count: number; items: IRepositoryResType[] }, number> = await octokit.request('GET /search/repositories{?q}', { q: request.input })
          setOptions(data.data.items)
        },
        400,
      ),
    [],
  )


  useEffect(() => {
    if (input === '') return
    // eslint-disable-next-line
    updateInput({ input })
// eslint-disable-next-line
  }, [input])

  return (
    <StyledAutocomplete
      options={options}

      PaperComponent={StyledPaper}
      getOptionLabel={(option) => option.name}
      // onChange={updateInput}
      onInputChange={(e, value) => {
        setInput(value)
      }}
      onChange={handlerChangeOptions}
      renderInput={(params) => <TextField
        {...params}
        label='Search Repositories'
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <div>
              {params.InputProps.endAdornment}
            </div>
          ),
        }}
      />}
      renderOption={(props, option) => <li key={`${option.id}`} {...props}>
        <Grid container alignItems='center'>
          <Typography variant='body2' color='text.secondary'>
            {option.name}
          </Typography>
        </Grid>
      </li>}
      fullWidth
      disablePortal
    />
  )
}

export default Autocomplete