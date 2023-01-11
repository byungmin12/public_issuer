import React from 'react'
import { Avatar, Box, styled, Typography } from '@mui/material'
import Chip from './Chip'
import Glassmophograph from '../styles/Glassmorphism'
import { IOwner } from '../types/owner'
import { ILabel } from '../types/label'


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

interface IIssueCard {
  repo: string;
  issueNumber:number;
  title: string;
  labels: ILabel[];
  assignees: IOwner[]
}

function IssueCard({repo,issueNumber,title,labels,assignees}:IIssueCard) {
  return (
    <Wrapper>
      <Box>
        <Typography>{repo}</Typography>
        <Typography variant="h5" >
          {`#${issueNumber} ${title}`}
          <Chips>
            {
              labels.map((label)=><Chip text="bug" color={`#${label.color}`} key={label.id} />)
            }
          </Chips>
        </Typography>
      </Box>
        <Avatar alt={assignees[0].gravatar_id} src={assignees[0].avatar_url} />
    </Wrapper>
  )
}

export default IssueCard