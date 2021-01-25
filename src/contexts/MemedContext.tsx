import React from 'react'

import { Patient } from '../domain'

export interface MemedContextValue {
  setDoctorToken: React.Dispatch<React.SetStateAction<string>>
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
  setActionRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLButtonElement> | undefined>>
  onLogout: (scriptId?: string) => void
  showPrescription: () => void
  hidePrescription: () => void
  loadingModule: boolean
}

const MemedContext = React.createContext<MemedContextValue | undefined>(undefined)

export default MemedContext
