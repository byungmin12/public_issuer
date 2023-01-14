import React from 'react'
import { styled } from '@mui/material'
import Repository from './Repository'
import useRepositories from '../stores/useRepositories'
import useSelectedRepository, { TSelectedRepo } from '../stores/useSelectRepository'

const Wrapper = styled('ul')`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`


function Repositories() {
  const searchedRepositories = useRepositories(state => state.repositories)
  const selectedRepo: TSelectedRepo = useSelectedRepository((state) => state.selectedRepo)
  const selectedRepoTitle = selectedRepo=== undefined  ? "" : selectedRepo.full_name

  return (
    <Wrapper>
      {
        searchedRepositories.map((repo) =>
          <li key={repo.id}>
            <Repository  repo={repo} isSelected={selectedRepoTitle === repo.full_name} />
          </li>,
        )
      }
    </Wrapper>
  )
}

export default Repositories