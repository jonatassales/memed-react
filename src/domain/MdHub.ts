import { Patient } from './Patient'
import { Module } from './Module'

export interface MdHub {
  server: {
    unbindEvents: () => void
  }
  command: {
    send: (moduleName: string, action: string, payload?: Patient | unknown) => Promise<void>
    deletePatient: unknown | boolean
    removePatient: unknown | boolean
    editPatient: unknown | boolean
  }
  module: Module
}
