import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Glassmophograph from '../styles/Glassmorphism'
import Repositories from '../components/Repositories'
import Issues from '../components/Issues'
import Autocomplete from '../components/Autocomplete'
import useRepositories from '../stores/useUserId'


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

const UserWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .MuiSvgIcon-root {
    cursor: pointer;
  }
`


function Issuer() {
  const navigate = useNavigate()
  const userId = useRepositories(state=>state.userId)
  const handlerUnstoreUserId = useRepositories(state=>state.handlerUnstoreUserId)



  React.useEffect(() => {
    if (userId === null) {
      navigate('/login')
    }
  }, [navigate, userId])

  const memoHandlerDeleteUserId = React.useCallback(()=>{
    handlerUnstoreUserId()
  },[handlerUnstoreUserId])


  return (
    <Wrapper>
      <StyledGlassmophograph>
        <UserWrapper>
          <Typography>{userId}</Typography>
          <CloseIcon onClick={memoHandlerDeleteUserId} />
        </UserWrapper>
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

