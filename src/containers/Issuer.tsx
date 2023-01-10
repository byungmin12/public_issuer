import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import Glassmophograph from '../styles/Glassmorphism'
import Autocomplete from '../components/Autocomplete'
import Repositories from '../components/Repositories'

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
      </StyledGlassmophograph>
    </Wrapper>
  )
}

export default Issuer

