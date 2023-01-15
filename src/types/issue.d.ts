import { IOwner } from './owner'
import { ILabel } from './label'

export interface IIssue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: IOwner,
  labels: ILabel[],
  state: string
  locked: boolean,
  assignee: IOwner,
  assignees: IOwner[],
  milestone: string | null,
  comments: number,
  created_at: string
  updated_at: string
  closed_at: string
  author_association: string,
  active_lock_reason: string | null,
  draft: boolean,
  pull_request: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
    merged_at: string
  },
  body:string
  reactions: {
    url: string
    total_count: number,
    laugh: number,
    hooray: number,
    confused: number,
    heart: number,
    rocket: number,
    eyes: number
  },
  timeline_url: string
  performed_via_github_app: string | null,
  state_reason: string | null
}