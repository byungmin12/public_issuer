import React, { useCallback } from 'react'
import { OctokitResponse } from '@octokit/types'
import { styled } from '@mui/material'
import IssueCard from './IssueCard'
import useRepositories from '../stores/useRepositories'
import { IIssue } from '../types/issue'
import octokit from '../apis/octokit'
import useFetch from '../apis/useFetch'

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
  const selectedRepositories = useRepositories(state => state.repositories)

  const handlerApi = useCallback(
    async () => {
      const promiseData = await Promise.allSettled(selectedRepositories.map((repo)=>octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'byungmin12',
        repo,
      })))

      const isFulfilled = <T,>(p:PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';

      const successData = promiseData.filter(isFulfilled).map(p => p.value.data).flat()

      return {
        data: successData,
      } as unknown as Promise<OctokitResponse<IIssue[]>>
    }, [selectedRepositories],
  )

  const {
    data: issues,
    isLoading
  } = useFetch<IIssue[]>( handlerApi,[selectedRepositories.length])


  if(isLoading )return <Wrapper>isLoading...</Wrapper>
  return (
    <Wrapper>
      {
        issues?.data.length === 0 ?
          '이슈가 없습니다.'
          :
          issues?.data.map((issue) => {
            const repoUrl = issue.repository_url.split('/')
            const repo = repoUrl[repoUrl.length - 1]

            return <li key={`${issue.node_id
            }-${repo}-${issue.title}`}><IssueCard repo={repo} title={issue.title} labels={issue.labels}
                                                  assignees={issue.assignees} issueNumber={issue.number} /></li>
          })
      }
    </Wrapper>
  )
}

export default Issues