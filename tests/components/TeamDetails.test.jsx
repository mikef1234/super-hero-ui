import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import TeamDetails from '../../components/TeamDetails'

describe('Components - TeamDetails', () => {
  it('displays the team and their slug', () => {
    const wrapper = shallow(<TeamDetails name="Stack Education" slug="stack-education" />)

    expect(wrapper.text()).to.equal('Stack Education (stack-education)')
  })
})
