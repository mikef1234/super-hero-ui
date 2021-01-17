import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import Team from '../../components/Team'

describe('Components - Team', () => {
  it('displays the team and their slug as a link to their heroes page', () => {
    const wrapper = shallow(<Team id={1} name="Stack Education" slug="stack-education" />)


    const Link = wrapper.find('Team__Link')

    expect(Link.prop('to')).to.equal('/heroes/stack-education')
    expect(Link.text()).to.equal('Stack Education (stack-education)')
  })
})
