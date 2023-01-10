import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type TRepository = string
export type TStoreRepositories = (repo: TRepository) => void

interface ILocalRepositories {
  repositories: TRepository[]
  handlerStoreRepositories: TStoreRepositories
  handlerUnstoreRepositories: TStoreRepositories

}

const useRepositories = create<ILocalRepositories>()(
  devtools(persist(
    (set, get) => ({
      repositories: [],
      handlerStoreRepositories: (repo: string) => {
        set({ repositories: get().repositories.length === 0 ? [repo] : [repo, ...get().repositories.slice(0, 3)] })
      },
      handlerUnstoreRepositories: (deleteRepo: string) => {
        set({ repositories: get().repositories.filter((repo)=>repo !== deleteRepo) })
      },
    }),
    {
      name: 'repositories', // name of the item in the storage (must be unique)
    },
  )))

export default useRepositories
