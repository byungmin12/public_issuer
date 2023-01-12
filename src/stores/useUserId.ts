import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type TUserId = string
export type TStoreUserId = (repo: TUserId) => void

interface ILocalUserId {
  userId: TUserId | null
  handlerStoreUserId: TStoreUserId
  handlerUnstoreUserId: ()=>void

}

const useRepositories = create<ILocalUserId>()(
  devtools(persist(
    (set) => ({
      userId: null,
      handlerStoreUserId: (newUserId: string) => {
        set({ userId: newUserId})
      },
      handlerUnstoreUserId: () => {
        set({ userId: null })
      },
    }),
    {
      name: 'userId', // name of the item in the storage (must be unique)
    },
  )))

export default useRepositories
