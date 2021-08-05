// eslint-disable-next-line import/no-duplicates
import HeaderLogged from '.'
import { shallowMount } from '@vue/test-utils'
import { routes } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }

jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render 3 dots when there is no user logged', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLoggout = wrapper.find('#logout-button')
    expect(buttonLoggout.text()).toBe('...')
  })

  it('should render user name when there is user logged', async () => {
    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'beni'
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLoggout = wrapper.find('#logout-button')
    expect(buttonLoggout.text()).toBe('beni (sair)')
  })
})
