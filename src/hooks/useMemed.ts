import React from 'react'

import {
  ProviderNotPlacedError,
  PrescriptionPrintedNotFunctionError,
  PrescriptionExcludedNotFunctionError
} from '../errors'
import { ModuleOptions } from '../domain'
import MemedContext, { MemedContextValue } from '../contexts/MemedContext'

export default function useMemed(options?: ModuleOptions): MemedContextValue {
  const memed = React.useContext(MemedContext)
  const [optionsSet, setOptionsSet] = React.useState(false)

  if (!memed) {
    throw ProviderNotPlacedError
  }

  React.useEffect(() => {
    if (options && !optionsSet) {
      const { onPrescriptionPrinted, onPrescriptionExcluded } = options

      /**
       * I had to do this because of non-ts-implementations using the lib
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof onPrescriptionPrinted !== 'function') {
        throw PrescriptionPrintedNotFunctionError
      } else if (typeof onPrescriptionExcluded !== 'function') {
        throw PrescriptionExcludedNotFunctionError
      }

      memed.setOptions(options)
      setOptionsSet(true)
    }
  }, [optionsSet, options, memed])

  return memed
}
