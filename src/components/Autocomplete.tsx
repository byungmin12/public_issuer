import React, { useCallback } from 'react'
import { OctokitResponse } from '@octokit/types'
import { Autocomplete as MuiAutocomplete, Paper, Skeleton, styled, TextField } from '@mui/material'
import useRepositories from '../stores/useRepositories'
import { IRepositoryResType } from '../types/repository'
import useFetch from '../apis/useFetch'
import octokit from '../apis/octokit'
import { glassmorphismStr } from '../styles/Glassmorphism'


const StyledAutocomplete = styled(MuiAutocomplete<string>)`
  ${()=>glassmorphismStr({})}
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
  const handlerStoreRepository = useRepositories(state => state.handlerStoreRepositories)
  const localRepositories = useRepositories(state => state.repositories)

  const handlerApi = useCallback(
    async () => {
      const res = await octokit.request('GET /users/{username}/repos', { username: 'byungmin12' })
      return res as unknown as Promise<OctokitResponse<IRepositoryResType[]>>
    }, [],
  )

  const {
    data: repos,
    isLoading,
  } = useFetch<IRepositoryResType[]>(handlerApi)


  const handlerChangeOptions = (e: React.SyntheticEvent<Element, Event>, value: unknown) => {
    const repo = value as string
    if (repo === '' || repo === null) return
    handlerStoreRepository(repo)
  }

  const filterRepoName = React.useMemo(() => {
    if (repos === null) return []
    return repos.data.map((repo) => repo.name)
  }, [repos])

  if (isLoading) return <Skeleton variant='rounded' height={56} />

  return (
    <StyledAutocomplete
      options={filterRepoName}
      renderInput={(params) => <TextField {...params} label='Repositories' />}
      PaperComponent={StyledPaper}
      onChange={handlerChangeOptions}
      filterOptions={(filterOptions) =>
        filterOptions.filter((option) => !localRepositories.includes(option))
      }
      fullWidth
      disablePortal
    />
  )
}

export default Autocomplete