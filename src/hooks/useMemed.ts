import React from 'react'

import { ProviderNotPlacedError, PrescriptionPrintedNotFunctionError } from '../errors'
import { ModuleOptions } from '../domain'
import MemedContext, { MemedContextValue } from '../contexts/MemedContext'

export default function useMemed(options?: ModuleOptions): MemedContextValue {
  const memed = React.useContext(MemedContext)
  const [optionsSet, setOptionsSet] = React.useState(false)

  if (!memed) {
    throw ProviderNotPlacedError
  }

  if (options && !optionsSet) {
    const { onPrescriptionPrinted } = options

    /**
     * I had to do this because of non-ts-implementations using the lib
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof onPrescriptionPrinted !== 'function') {
      throw PrescriptionPrintedNotFunctionError
    }
    memed.setOptions(options)
    setOptionsSet(true)
  }

  return memed
}
