import { MdHubNotInitializedError } from '../errors'

export default function showPrescription(): void {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  window.MdHub.module.show('plataforma.prescricao')
}
