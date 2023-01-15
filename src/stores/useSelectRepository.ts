import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { IRepositoryResType } from '../types/repository'

export type TSelectedRepo = IRepositoryResType | undefined
export type TSelectedRepoFunc = (selectedRepo: IRepositoryResType) => void

interface ISelectedRepo {
  selectedRepo: TSelectedRepo
  handlerSelectRepo: TSelectedRepoFunc
  handlerDeleteRepo: ()=>void
}

const useSelectedRepository = create<ISelectedRepo>()(
  devtools((set) => ({
    selectedRepo: undefined,
    handlerSelectRepo: (selectedRepo: IRepositoryResType) => {
      set(() => ({ selectedRepo })
      )
    },
    handlerDeleteRepo: ()=>{
      set(()=>({selectedRepo:undefined}))
    }
  })),
)

export default useSelectedRepository
