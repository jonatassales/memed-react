import React from 'react'

import { MdSinapsePrescricaoNotInitializedError } from '../errors'
import { Module, ModuleOptions } from '../domain'

export default function onLoadPrescription(
  setPrescriptionLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  options?: ModuleOptions
): void {
  if (!('MdSinapsePrescricao' in window)) {
    throw MdSinapsePrescricaoNotInitializedError
  }

  window.MdSinapsePrescricao.event.add('core:moduleInit', function startMemedConfigs(modulo: Module) {
    if (modulo.name === 'plataforma.prescricao') {
      setPrescriptionLoaded(true)

      if (options) {
        console.log('prescricaoImpressa: handled')
        window.MdHub.event.add('prescricaoImpressa', options.onPrescriptionPrinted)
      }
    }
  })
}
