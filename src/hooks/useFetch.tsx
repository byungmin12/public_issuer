import { useEffect, useReducer } from 'react'
import { OctokitResponse } from '@octokit/types'

interface State<T> {
  data: OctokitResponse<T, number> | null
  error: Error | null
  isLoading: boolean
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: OctokitResponse<T, number> }
  | { type: 'error'; payload: Error }

function useFetch<T>(api: () => Promise<OctokitResponse<T, number>>,deps: any[] = []): State<T> {

  const initialState: State<T> = {
    error: null,
    data: null,
    isLoading: true,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {
          isLoading: true,
          data: null,
          error: null,
        }
      case 'fetched':
        return {
          isLoading: false,
          data: action.payload,
          error: null,
        }
      case 'error':
        return {
          isLoading: false,
          data: null,
          error: action.payload,
        }
      default:
        throw new Error(`Unhandled action type`)
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const fetchData = async () => {
    dispatch({ type: 'loading' })
    try {
      const data = await api()
      dispatch({ type: 'fetched', payload: data })
    } catch (e) {
      const error = e as Error
      dispatch({ type: 'error', payload: error })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    fetchData()
    // eslint-disable-next-line
  }, deps)

  return state
}

export default useFetch
