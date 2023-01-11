import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import Glassmophograph from '../styles/Glassmorphism'
import Repositories from '../components/Repositories'
import Issues from '../components/Issues'
import Autocomplete from '../components/Autocomplete'


const Wrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledGlassmophograph = styled(Glassmophograph)`
  padding: 20px;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`


function Issuer() {
  return (
    <Wrapper>
      <StyledGlassmophograph>
        <Typography>User name</Typography>
        <Box>
          <Autocomplete />
          <Repositories />
        </Box>
        <Issues />
      </StyledGlassmophograph>
    </Wrapper>
  )
}

export default Issuer

