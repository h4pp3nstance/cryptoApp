import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { describe, expect, test } from 'vitest'

describe('Home.vue', () => {
  test('renders home view', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toMatch('Crypto Prices')
  })
})
