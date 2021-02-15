import { ModuleOptions } from '../domain'
import { MdHubNotInitializedError } from '../errors'

export default function setupOptions(options: ModuleOptions): void {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  const { onPrescriptionPrinted } = options

  window.MdHub.event.add('prescricaoImpressa', onPrescriptionPrinted)
}
