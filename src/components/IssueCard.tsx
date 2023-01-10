import React from 'react'
import { Avatar, Box, styled, Typography } from '@mui/material'
import Chip from './Chip'
import Glassmophograph from '../styles/Glassmorphism'


const Wrapper = styled(Glassmophograph)`
  height: 25%;
  margin-bottom: 24px;
  padding: 24px;
  box-shadow: 0 4px 30px rgb(0 0 0 / 0%);
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  cursor: pointer;
  scale: 0.99;
  transition-duration: 0.5s;


  &:hover {
    scale: 1;
  }
`

const Chips = styled(Box)`
  display: flex;
  gap:6px;
`

function IssueCard() {
  return (
    <Wrapper>
      <Box>
        <Typography variant="h5" >
          #1 Issue
          <Chips>
            {
              [1,2,3].map((n)=><Chip text="bug" color="f29513" key={n} />)
            }
          </Chips>
        </Typography>
        <Typography variant="body1">
          I&apos;m having a problem with this.
        </Typography>
      </Box>
        <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/79984280" />
    </Wrapper>
  )
}

export default IssueCard