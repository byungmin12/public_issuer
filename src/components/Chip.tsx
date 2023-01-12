import React from 'react'
import { Box, styled } from '@mui/material'

interface IChip {
  color:string;
  text:string
}

const Wrapper = styled(Box)<{backgroundColor: string}>`
  padding: 3px 6px;
  background-color: ${({backgroundColor})=>backgroundColor};
  border-radius: 12px;
  font-size: 12px;
`

function Chip({text,color}:IChip) {
  return (
    <Wrapper  backgroundColor={color} component="span">
      {text}
    </Wrapper>
  )
}

export default Chip