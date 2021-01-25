import { MdHub, MdSinapsePrescricao } from './domain'
declare global {
  interface Window {
    MdHub: MdHub
    MdSinapsePrescricao: MdSinapsePrescricao
  }
}

export * from './domain'
export { useMemed } from './hooks'
export { default } from './providers/MemedProvider'
