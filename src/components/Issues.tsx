import React, { useCallback, useEffect, useState } from 'react'
import { OctokitResponse } from '@octokit/types'
import { styled } from '@mui/material'
import IssueCard from './IssueCard'
import { IIssue } from '../types/issue'
import octokit from '../apis/octokit'
import useFetch from '../apis/useFetch'
import useSelectedRepository from '../stores/useSelectRepository'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const Wrapper = styled('ul')`
  height: inherit;
  padding: 0;
  list-style: none;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`


function Issues() {
  const [issues, setIssues] = useState<IIssue[]>([])
  const selectedRepository = useSelectedRepository(state => state.selectedRepo)
  const [pageNumber, setPageNumber] = useState(1)
  const maxPage = Math.ceil(selectedRepository === undefined ? 1 : selectedRepository.open_issues_count / 30)

  useEffect(() => {
    setIssues([])
    setPageNumber(0)
  }, [selectedRepository])

  const handlerApi = useCallback(
    async () => {
      if (selectedRepository === undefined) {
        return { data: [] } as unknown as OctokitResponse<IIssue[], number>
      }
      return await octokit.request('GET /repos/{owner}/{repo}/issues{?page}', {
        owner: selectedRepository.owner.login,
        repo: selectedRepository.name,
        page: pageNumber,
      }) as unknown as OctokitResponse<IIssue[], number>
    }, [selectedRepository, pageNumber],
  )

  const {
    data: resIssues,
    isLoading,
  } = useFetch<IIssue[]>(handlerApi, [selectedRepository, pageNumber])

  useEffect(() => {
    if (resIssues?.data !== undefined) {
      setIssues((prev) => [...prev, ...resIssues.data])
    }
  }, [resIssues])

  const {lastPostRef} = useInfiniteScroll<HTMLLIElement>({
    cb: () => {
      if (pageNumber < maxPage) {
        setPageNumber((prev) => prev + 1)
      }
    }, deps: [isLoading], isLoading,
  })

  const MemoIssues = useCallback(
    () => <>
      {
        issues.map((issue, idx) => {
          const repoUrl = issue.repository_url.split('/')
          const repo = repoUrl[repoUrl.length - 1]

          if ( issues.length >= 30 &&idx === issues.length - 1) {
            return <li ref={lastPostRef} key={`${issue.node_id
            }-${repo}-${issue.title}`}><IssueCard repo={repo} title={issue.title} labels={issue.labels}
                                                  user={issue.user} issueNumber={issue.number} url={issue.html_url} />
            </li>
          }

          return <li key={`${issue.node_id
          }-${repo}-${issue.title}`}><IssueCard repo={repo} title={issue.title} labels={issue.labels}
                                                user={issue.user} issueNumber={issue.number} url={issue.html_url} />
          </li>
        })
      }
    </>,
    [issues, lastPostRef],
  )


  if (selectedRepository === undefined) return <Wrapper>저장된 Repository 중 하나를 선택해주세요</Wrapper>


  return (
    <Wrapper>
      {
        (!isLoading && issues.length === 0) ?
          '이슈가 없습니다.'
          :
          <MemoIssues />
      }
      {
        isLoading &&
        <div>Loading....</div>
      }
    </Wrapper>
  )
}

export default Issues