import React from 'react'
import { styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Glassmophograph from '../styles/Glassmorphism'
import useRepositories from '../stores/useRepositories'

interface IRepository {
  title: string
}

const Wrapper = styled(Glassmophograph)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: auto;
  height: auto;
  padding: 6px 12px;
  
  & .MuiTypography-root {
    cursor: pointer;
  }

  & .MuiSvgIcon-root {
    font-size: 12px;
    cursor: pointer;
  }


`

const  Repository = React.memo(({ title }: IRepository) => {
  const handlerUnstoreRepository = useRepositories(state => state.handlerUnstoreRepositories)

  return (
    <Wrapper>
      <Typography onClick={()=>{
        console.log("filter")
      }}>
        {title}
      </Typography>
      <CloseIcon onClick={() => {
        handlerUnstoreRepository(title)
      }} />
    </Wrapper>
  )
})

export default Repository