import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Team = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`

const Link = styled(NavLink)`
  text-decoration: none;
`

export default ({ id, name, slug }) => (
  <Team key={id}>
    <Link to={`/heroes/${slug}`}>{`${name} (${slug})`}</Link>
  </Team>
)
