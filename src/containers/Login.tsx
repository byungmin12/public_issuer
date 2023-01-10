import { Box, Button, Input, InputLabel, Paper as P, styled, Typography } from '@mui/material'
import React from 'react'

const Wrapper = styled(Box)`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Paper = styled(P)`
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


function Login() {
  const [idTextValue, setIdTextValue] = React.useState('')

  const handlerAddGithubID = () => {
    localStorage.setItem('githubId', idTextValue)
  }

  const handlerChangeIdTextValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIdTextValue(e.target.value)
  }

  return (
    <Wrapper>
      <Paper>
        <Typography variant='h5'>GITHUB</Typography>
        <Box>
          <InputLabel htmlFor='my-input'>User&apos;s github ID</InputLabel>
          <Input value={idTextValue} onChange={handlerChangeIdTextValue} id='my-input'
                 aria-describedby='my-helper-text' />
        </Box>
        <Button onClick={handlerAddGithubID}> Enter </Button>
      </Paper>
    </Wrapper>
  )
}

export default Login