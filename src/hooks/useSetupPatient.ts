import React from 'react'

import { Patient } from '../domain'
import { setMemedPatient } from '../actions'

interface SetupPatientParams {
  patient?: Patient
  prescriptionLoaded: boolean
}

interface SetupPatientResult {
  patientSet: boolean
}
export default function useSetupPatient(params: SetupPatientParams): SetupPatientResult {
  const { patient, prescriptionLoaded } = params

  const [patientSet, setPatientSet] = React.useState(false)

  React.useEffect(() => {
    if (patient && prescriptionLoaded) {
      setMemedPatient(patient).then(() => {
        setPatientSet(true)
      })
    }
  }, [patient, prescriptionLoaded])

  return { patientSet }
}
