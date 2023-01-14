import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IRepositoryResType } from '../types/repository'

export type TStoreRepositories = (repo: IRepositoryResType) => void

interface ILocalRepositories {
  repositories: IRepositoryResType[]
  handlerStoreRepositories: TStoreRepositories
  handlerUnstoreRepositories: TStoreRepositories

}

const useRepositories = create<ILocalRepositories>()(
  devtools(persist(
    (set, get) => ({
      repositories: [],
      handlerStoreRepositories: (repo: IRepositoryResType) => {
        set({ repositories: get().repositories.length === 0 ? [repo] : [repo, ...get().repositories.slice(0, 3)] })
      },
      handlerUnstoreRepositories: (deleteRepo: IRepositoryResType) => {
        set({ repositories: get().repositories.filter((repo) => repo !== deleteRepo) })
      },
    }),
    {
      name: 'repositories', // name of the item in the storage (must be unique)
    },
  )))

export default useRepositories
