import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import Hero from '../../components/Hero'

describe('Components - Hero', () => {
  it('displays the hero with their code name and real name', () => {
    const wrapper = shallow(<Hero id={1} name="Cyclops" realname="Scott Summers" />)

    expect(wrapper.text()).to.equal('Cyclops (Scott Summers)')
  })
})
