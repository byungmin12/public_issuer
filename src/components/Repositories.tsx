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
  const selectedRepositories = useRepositories(state => state.repositories)

  return (
    <Wrapper>
      {
        selectedRepositories.map((repo) =>
          <li key={repo.id}>
            <Repository  repo={repo} />
          </li>,
        )
      }
    </Wrapper>
  )
}

export default Repositories