import React from 'react'

import { Patient } from '../domain'
import { useScriptLoader, useSetupCommands, useActionButtonBind } from '../hooks'
import MemedContext from '../contexts/MemedContext'

import { cleanUp, showPrescription, hidePrescription } from '../actions'

interface MemedContextProviderProps {
  children: React.ReactNode
  color?: string
  scriptSrc?: string
  scriptId?: string
}

export default function MemedProvider(props: MemedContextProviderProps): React.ReactElement {
  const {
    children,
    color = '#00B8D6',
    scriptSrc = 'https://sandbox.memed.com.br/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js',
    scriptId = 'memedScript'
  } = props

  const [doctorToken, setDoctorToken] = React.useState('')
  const [patient, setPatient] = React.useState<Patient>()
  const [actionRef, setActionRef] = React.useState<React.RefObject<HTMLButtonElement>>()

  const { prescriptionLoaded } = useScriptLoader({
    doctorToken,
    color,
    scriptSrc,
    scriptId
  })

  const { patientSet } = useSetupCommands({ patient, prescriptionLoaded })

  useActionButtonBind({ patientSet, actionRef })

  const onLogout = React.useCallback(() => {
    if (prescriptionLoaded) {
      cleanUp(scriptId)
    }
  }, [scriptId, prescriptionLoaded])

  const loadingModule = !prescriptionLoaded

  return (
    <MemedContext.Provider
      value={{
        setDoctorToken,
        setPatient,
        setActionRef,
        onLogout,
        loadingModule,
        showPrescription,
        hidePrescription
      }}
    >
      {children}
    </MemedContext.Provider>
  )
}
