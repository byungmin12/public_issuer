import { useEffect, useReducer, useRef } from 'react'
import { OctokitResponse } from '@octokit/types'

interface State<T> {
  data?: T
  isError?: Error
  isLoading?: boolean
}

type Cache<T> = Record<string, T>

// discriminated union type
type Action<T> =
  | { type: 'loading'; payload: boolean }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

function useFetch<T>(url?: string, api?: () => Promise<OctokitResponse<T, number>>): State<T> {
  const cache = useRef<Cache<T>>({})
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    isError: undefined,
    data: undefined,
    isLoading: false
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, isLoading: action.payload }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, isError: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (url === undefined) return undefined
    if (api === undefined) return undefined

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: 'loading', payload: true })

      if (cache.current[url] !== undefined) {
        dispatch({ type: 'fetched', payload: cache.current[url] })
        return
      }

      try {
        const response = await api()

        if (response.status >= 300) {
          throw new Error(`fail ${url} api`)
        }

        const { data } = response
        cache.current[url] = data
        if (cancelRequest.current) return

        dispatch({ type: 'loading', payload: false })
        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (cancelRequest.current) return
        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()

    return () => {
      cancelRequest.current = true
    }


  }, [url, api])

  return state
}

export default useFetch
