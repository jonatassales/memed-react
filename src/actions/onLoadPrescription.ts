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

      if (!options) {
        return
      }

      const { onPrescriptionPrinted } = options

      if (!!onPrescriptionPrinted && typeof onPrescriptionPrinted === 'function') {
        window.MdHub.event.add('prescricaoImpressa', onPrescriptionPrinted)
      }
    }
  })
}
