import React from 'react'

import { ModuleOptions } from '../domain'
import { createMemedScript, onLoadPrescription } from '../actions'

interface ScriptLoaderOptions {
  doctorToken: string
  color: string
  scriptSrc: string
  scriptId: string
  moduleOptions?: ModuleOptions
}

interface ScriptLoaderResult {
  prescriptionLoaded: boolean
}
export default function useScriptLoader(options: ScriptLoaderOptions): ScriptLoaderResult {
  const { doctorToken, color, scriptSrc, scriptId, moduleOptions } = options

  const [prescriptionLoaded, setPrescriptionLoaded] = React.useState(false)

  React.useEffect(() => {
    if (doctorToken) {
      const memedScript = createMemedScript(doctorToken, color, scriptSrc, scriptId, setPrescriptionLoaded)
      memedScript.onload = onLoadPrescription.bind(null, setPrescriptionLoaded, moduleOptions)
    }
  }, [doctorToken, moduleOptions])

  return { prescriptionLoaded }
}
