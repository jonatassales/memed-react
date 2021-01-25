import { MdHubNotInitializedError } from '../errors'
import { Patient } from '../domain'

export default async function setMemedPatient(patient: Patient): Promise<void> {
  if (!('MdHub' in window)) {
    throw MdHubNotInitializedError
  }

  const { nome, endereco, cidade, telefone, peso, altura, idExterno } = patient
  await window.MdHub.command.send('plataforma.prescricao', 'setPaciente', {
    nome,
    endereco,
    cidade,
    telefone,
    peso,
    altura,
    idExterno
  })
}
