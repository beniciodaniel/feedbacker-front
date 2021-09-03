import useStore from './state'
import { setCurrentComponent, setFeedbackType } from '../store'

export interface Navigation {
  next(): void
  back(): void
}

export default function useNavigation (): Navigation {
  const store = useStore()

  function next (): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback')
    }
  }

  function back (): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setFeedbackType('')
    }
  }

  return {
    back,
    next
  }
}
