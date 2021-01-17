import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`

const Subtitle = styled.div`
  font-size: 20px;
`

export default () => (
  <>
    <Title>Meet the Heroes</Title>
    <Subtitle>A searchable list of all your favorite teams of heroes</Subtitle>
  </>
)
