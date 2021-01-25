import React from 'react'

import { showPrescription } from '../actions'

interface ActionButtonBindOptions {
  actionRef?: React.RefObject<HTMLButtonElement>
  patientSet: boolean
}

export default function useActionButtonBind(options: ActionButtonBindOptions): void {
  const { actionRef, patientSet } = options

  React.useEffect(() => {
    if (actionRef?.current && patientSet) {
      actionRef.current.addEventListener('click', showPrescription)
    }

    return () => {
      if (actionRef?.current) {
        actionRef?.current.removeEventListener('click', showPrescription)
      }
    }
  }, [actionRef, patientSet])
}
