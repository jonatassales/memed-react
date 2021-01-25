import { MdHubNotInitializedError } from '../errors'

export default function cleanUp(scriptId: string): void {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  window.MdHub.command.send('plataforma.sdk', 'logout')
  window.MdHub.server.unbindEvents()

  const memedScriptFound = document.getElementById(scriptId)
  if (memedScriptFound) {
    document.body.removeChild(memedScriptFound)
  }
}
