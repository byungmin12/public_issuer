import React from 'react'
import { css, keyframes, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Glassmophograph from '../styles/Glassmorphism'
import useRepositories from '../stores/useRepositories'
import { IRepositoryResType } from '../types/repository'
import useSelectedRepository from '../stores/useSelectRepository'

interface IRepository {
  repo: IRepositoryResType
  isSelected: boolean
}

const shaking = keyframes`
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
`

const Wrapper = styled(Glassmophograph)<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: auto;
  height: auto;
  padding: 6px 12px;

  ${({selected}) => selected && css`
   animation: ${shaking} .5s infinite;
  `}


  & .MuiTypography-root {
    cursor: pointer;
  }
;

  & .MuiSvgIcon-root {
    font-size: 12px;
    cursor: pointer;
  }
;
`

const Repository = React.memo(({ repo, isSelected }: IRepository) => {
  const handlerUnstoreRepository = useRepositories(state => state.handlerUnstoreRepositories)
  const handlerSelectedRepo = useSelectedRepository((state) => state.toggleSelectedRepo)

  return (
    <Wrapper selected={isSelected}>
      <Typography onClick={() => {
        handlerSelectedRepo(repo)

      }}>
        {repo.full_name}
      </Typography>
      <CloseIcon onClick={() => {
        handlerSelectedRepo(repo)
        handlerUnstoreRepository(repo)
      }} />
    </Wrapper>
  )
})

export default Repository