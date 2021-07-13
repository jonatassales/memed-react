import React from 'react'

import { ModuleOptions, Patient } from '../domain'
import { useScriptLoader, useSetupCommands, useActionButtonBind, useSetupPatient } from '../hooks'
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
  const [options, setOptions] = React.useState<ModuleOptions>()

  const { prescriptionLoaded } = useScriptLoader({
    doctorToken,
    color,
    scriptSrc,
    scriptId
  })

  const { patientSet } = useSetupPatient({ patient, prescriptionLoaded })

  useSetupCommands({ options, prescriptionLoaded })

  useActionButtonBind({ patientSet, actionRef })

  const onLogout = React.useCallback(() => {
    if (prescriptionLoaded) {
      cleanUp(scriptId)
    }
  }, [scriptId, prescriptionLoaded])

  const loadingModule = React.useMemo(() => !prescriptionLoaded || !patientSet, [prescriptionLoaded, patientSet])

  const contextValue = React.useMemo(
    () => ({
      setDoctorToken,
      setPatient,
      setActionRef,
      onLogout,
      loadingModule,
      showPrescription,
      hidePrescription,
      setOptions
    }),
    [onLogout, loadingModule]
  )

  return <MemedContext.Provider value={contextValue}>{children}</MemedContext.Provider>
}
