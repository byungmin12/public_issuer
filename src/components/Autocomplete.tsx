import React from 'react'
import { Autocomplete as MuiAutocomplete, Paper, styled, TextField } from '@mui/material'
import useRepositories from '../stores/useRepositories'


const StyledAutocomplete = styled(MuiAutocomplete)`
  background: rgba(255, 255, 255, 0.11);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.6px);
  -webkit-backdrop-filter: blur(3.6px);

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
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
`


function Autocomplete() {
  const handlerStoreRepository = useRepositories(state => state.handlerStoreRepositories)
  const localRepositories = useRepositories(state => state.repositories)


  return (
    <StyledAutocomplete
      multiple={false}
      options={['test', 'test1', 'test3', 'test4',"test5"]}
      renderInput={(params) => <TextField {...params} label='Repositories' />}
      PaperComponent={StyledPaper}
      onChange={(e, value) => {
        const repo = value as string
        handlerStoreRepository(repo)
      }}
      filterOptions={(options) =>
        options.filter((option) => !localRepositories.includes(option as string))
      }
      fullWidth
      disablePortal

    />
  )
}

export default Autocomplete