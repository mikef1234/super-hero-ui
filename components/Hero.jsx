import React from 'react'
import styled from 'styled-components'

const Hero = styled.div`
  font-size: 16px;
  margin: 10px 0;
  text-align: center;
`

export default ({ id, name, realname }) => (
  <Hero key={id}>
    {`${name} (${realname})`}
  </Hero>
)
