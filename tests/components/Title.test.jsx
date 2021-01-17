import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import Title from '../../components/Title'

describe('Components - Title', () => {
  it('displays the title and subtitle', () => {
    const wrapper = shallow(<Title />)

    expect(wrapper.find('Title').text()).to.equal('Meet the Heroes')
    expect(wrapper.find('Title__Subtitle').text()).to.equal('A searchable list of all your favorite teams of heroes')
  })
})
