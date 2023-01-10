import { Box, styled } from '@mui/material'

interface IGlassmophograph {
  transparency?: number,
  radius?: number,
  blur?: number,

}

const Glassmophograph = styled(Box)<IGlassmophograph>`
  background: rgba(255, 255, 255, 0.11);
  border-radius: ${({radius})=>radius}px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(${({blur})=>blur}px);
  -webkit-backdrop-filter: blur(${({blur})=>blur}px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

Glassmophograph.defaultProps = {
  radius : 16,
  blur: 3.9,
}

export default Glassmophograph