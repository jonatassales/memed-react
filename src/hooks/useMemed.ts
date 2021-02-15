import React from 'react'

import { PrescriptionPrintedNotFunctionError, ProviderNotPlacedError } from '../errors'
import { ModuleOptions } from 'src/domain'
import MemedContext, { MemedContextValue } from '../contexts/MemedContext'

export default function useMemed(options: ModuleOptions): MemedContextValue {
  const memed = React.useContext(MemedContext)
  if (!memed) {
    throw ProviderNotPlacedError
  }

  /**
   * I had to do this because of non-ts-implementations using the lib
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (onPrescriptionPrinted !== 'function') {
    throw PrescriptionPrintedNotFunctionError
  }

  memed.setOptions(options)

  return memed
}
