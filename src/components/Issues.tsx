import React, { useCallback } from 'react'
import { OctokitResponse } from '@octokit/types'
import { styled } from '@mui/material'
import IssueCard from './IssueCard'
import { IIssue } from '../types/issue'
import octokit from '../apis/octokit'
import useFetch from '../apis/useFetch'
import useSelectedRepository from '../stores/useSelectRepository'

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
  const selectedRepository = useSelectedRepository(state => state.selectedRepo)


  const handlerApi = useCallback(
    async () => {
      if(selectedRepository === undefined){
        return {data : []} as unknown as OctokitResponse<IIssue[], number>
      }
      return await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: selectedRepository.owner.login,
        repo: selectedRepository.name,
      })as unknown as OctokitResponse<IIssue[], number>
    }, [selectedRepository],
  )

  const {
    data: issues,
    isLoading,
  } = useFetch<IIssue[]>(handlerApi, [selectedRepository])

  if (selectedRepository === undefined) return <Wrapper>저장된 Repository 중 하나를 선택해주세요</Wrapper>

  if (isLoading) return <Wrapper>isLoading...</Wrapper>

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
                                                  user={issue.user} issueNumber={issue.number} url={issue.html_url} />
            </li>
          })
      }
    </Wrapper>
  )
}

export default Issues