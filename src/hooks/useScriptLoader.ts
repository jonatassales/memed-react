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
  const [memedScript, setMemedScript] = React.useState<HTMLScriptElement>()

  React.useEffect(() => {
    if (doctorToken) {
      const script = createMemedScript(doctorToken, color, scriptSrc, scriptId, setPrescriptionLoaded)
      setMemedScript(script)
    }
  }, [doctorToken])

  React.useEffect(() => {
    const handleOnLoad = onLoadPrescription.bind(null, setPrescriptionLoaded, moduleOptions)
    if (memedScript) {
      memedScript.onload = handleOnLoad
    }
    return () => {
      if (memedScript) {
        memedScript.removeEventListener('load', handleOnLoad)
      }
    }
  }, [memedScript, moduleOptions])

  return { prescriptionLoaded }
}
