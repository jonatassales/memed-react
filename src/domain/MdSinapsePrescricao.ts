import { Module } from './Module'

export interface MdSinapsePrescricao {
  setToken: (token: string) => void
  event: {
    add(module: string, handler: (module: Module) => void): void
  }
}
