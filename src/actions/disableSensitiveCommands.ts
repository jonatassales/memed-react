import { MdHubNotInitializedError } from '../errors'

export default function disableSensitiveCommands(): void {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  window.MdHub.command.send('plataforma.prescricao', 'setFeatureToggle', {
    deletePatient: false,
    removePatient: false,
    editPatient: false
  })
}
