import { MdHubNotInitializedError } from '../errors'

export default function disableSensitiveCommands(): void {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  window.MdHub.command.deletePatient = false
  window.MdHub.command.removePatient = false
  window.MdHub.command.editPatient = false
}
