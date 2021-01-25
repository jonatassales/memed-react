import React from 'react'

import { ProviderNotPlacedError } from '../errors'
import MemedContext, { MemedContextValue } from '../contexts/MemedContext'

export default function useMemed(): MemedContextValue {
  const memed = React.useContext(MemedContext)
  if (!memed) {
    throw ProviderNotPlacedError
  }

  return memed
}
