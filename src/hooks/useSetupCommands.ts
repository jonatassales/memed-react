import React from 'react'

import { ModuleOptions } from '../domain'
import { disableSensitiveCommands } from '../actions'
import setupOtions from 'src/actions/setupOptions'

interface SetupCommandsParams {
  prescriptionLoaded: boolean
  options?: ModuleOptions
}

export default function useSetupCommands(params: SetupCommandsParams): void {
  const { options, prescriptionLoaded } = params

  React.useEffect(() => {
    if (prescriptionLoaded) {
      disableSensitiveCommands()
      if (options) {
        setupOtions(options)
      }
    }
  }, [options, prescriptionLoaded])
}
