import React from 'react'
import { styled } from '@mui/material'
import Repository from './Repository'
import useRepositories from '../stores/useRepositories'

const Wrapper = styled('ul')`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`


function Repositories() {
  const searchedRepositories = useRepositories(state => state.repositories)

  return (
    <Wrapper>
      {
        searchedRepositories.map((repo) =>
          <li key={repo.id}>
            <Repository  repo={repo} />
          </li>,
        )
      }
    </Wrapper>
  )
}

export default Repositories