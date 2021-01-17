import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Search from '../components/Search'
import Team from '../components/Team'
import Title from '../components/Title'
import { filterTeams, retrieveTeams } from '../utils/teams'

export default () => {
  const [teamList, setTeamList] = useState([])
  const [filteredTeamList, setFilteredTeamList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function pullData() {
      const teams = await retrieveTeams()

      setTeamList(teams)
      setFilteredTeamList(teams)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterTeams(teamList, searchTerm)

    setFilteredTeamList(filtered)
  }, [searchTerm])

  return (
    <Page>
      <Title />
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredTeamList.map(team => <Team key={team.id} id={team.id} name={team.name} slug={team.slug} />)
      }
    </Page>
  )
}
