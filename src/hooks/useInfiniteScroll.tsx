import { useCallback, useRef } from 'react'

interface IInfiniteScroll {
  isLoading: boolean
  cb: () => void
  deps: any[]
}

function useInfiniteScroll<T>({ isLoading, cb, deps }: IInfiniteScroll) {
  const intObserver = useRef<IntersectionObserver | null>(null)

  const lastPostRef = useCallback((_issue: T & Element) => {
    if (isLoading) return

    if (intObserver.current !== null) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(intersectionIssue => {
      if (intersectionIssue[0].isIntersecting) {
        cb()
      }
    },{threshold: 1})
    if (_issue !== null) intObserver.current.observe(_issue)

    // eslint-disable-next-line
  }, deps)

  return { lastPostRef, intObserver }
}

export default useInfiniteScroll