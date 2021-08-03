import useStore from '../hooks/useStore'
import { cleanCurrentUser, resetUserStore, setCurrentUser, setAPIKey } from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })
  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'beni' })
    expect(store.User.currentUser.name).toBe('beni')
  })

  it('should set api_key on current user', () => {
    const store = useStore()
    setAPIKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('should clean current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'beni' })
    expect(store.User.currentUser.name).toBe('beni')
    cleanCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})
