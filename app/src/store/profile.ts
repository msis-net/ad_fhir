import { map, atom } from 'nanostores'
export interface ProfileValue {
  name: string,
  email?: string
}

export const $profile = map<ProfileValue>({
  name: 'anonymous'
})

export const count = atom<number>(0)