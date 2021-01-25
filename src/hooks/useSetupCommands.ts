import React from 'react'

import { Patient } from '../domain'
import { setMemedPatient, disableSensitiveCommands } from '../actions'

interface SetupCommandsOptions {
  patient?: Patient
  prescriptionLoaded: boolean
}

interface SetupCommandsResult {
  patientSet: boolean
}
export default function useSetupCommands(options: SetupCommandsOptions): SetupCommandsResult {
  const { patient, prescriptionLoaded } = options

  const [patientSet, setPatientSet] = React.useState(false)

  React.useEffect(() => {
    if (patient && prescriptionLoaded) {
      setMemedPatient(patient).then(() => {
        setPatientSet(true)
        disableSensitiveCommands()
      })
    }
  }, [patient, prescriptionLoaded])

  return { patientSet }
}
