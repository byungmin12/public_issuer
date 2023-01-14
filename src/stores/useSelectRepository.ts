import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { IRepositoryResType } from '../types/repository'

export type TSelectedRepo = IRepositoryResType | undefined
export type IToggleSelectedRepo = (selectedRepo: IRepositoryResType) => void

interface ISelectedRepo {
  selectedRepo: TSelectedRepo
  toggleSelectedRepo: IToggleSelectedRepo
}

const useSelectedRepository = create<ISelectedRepo>()(
  devtools((set) => ({
    selectedRepo: undefined,
    toggleSelectedRepo: (selectedRepo: IRepositoryResType) => {
      set((state) => {
        if (state.selectedRepo === undefined || (selectedRepo.full_name !== state.selectedRepo.full_name)) {
          return { selectedRepo }
        }
        return { selectedRepo: undefined }

      })
    },
  })),
)

export default useSelectedRepository
