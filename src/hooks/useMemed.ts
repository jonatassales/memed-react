import React from 'react'

import { ProviderNotPlacedError } from '../errors'
import { ModuleOptions } from 'src/domain'
import MemedContext, { MemedContextValue } from '../contexts/MemedContext'

export default function useMemed(options?: ModuleOptions): MemedContextValue {
  const memed = React.useContext(MemedContext)
  if (!memed) {
    throw ProviderNotPlacedError
  }

  if (options) {
    memed.setOptions(options)
  }

  return memed
}
