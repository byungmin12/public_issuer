import { Box, Button, Input, InputLabel, Paper as P, styled, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import octokit from '../apis/octokit'
import useRepositories from '../stores/useUserId'

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
  const handlerStoreUserId = useRepositories(state=>state.handlerStoreUserId)
  const navigate = useNavigate()

  const handlerAddGithubID = () => {
    (
      async () => {
        try {
          const getUser = await octokit.request('GET /users/{username}', {
            username: idTextValue
          })

          if(getUser.status ===200){
            handlerStoreUserId(idTextValue)
            navigate("/")
          }
        }catch (e){
          alert("아이디가 없습니다.\n 다시 확인해주세요")
        }
        setIdTextValue("")
      }
    )().catch((e)=>{
      alert(e)
    })
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