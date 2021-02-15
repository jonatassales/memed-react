import React from 'react'

import { ModuleOptions } from '../domain'
import { disableSensitiveCommands, setupOptions } from '../actions'

interface SetupCommandsParams {
  prescriptionLoaded: boolean
  options?: ModuleOptions
}

interface SetupOptionsResult {
  optionsSet: boolean
}

export default function useSetupCommands(params: SetupCommandsParams): SetupOptionsResult {
  const { options, prescriptionLoaded } = params

  const [optionsSet, setOptionsSet] = React.useState(false)

  React.useEffect(() => {
    if (prescriptionLoaded) {
      disableSensitiveCommands()
      if (options) {
        setupOptions(options)
        setOptionsSet(true)
      }
    }
  }, [options, prescriptionLoaded])

  return { optionsSet }
}
