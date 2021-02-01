import React from 'react'
import Button from '@material-ui/core/Button'

import { useMemed } from 'memed-react'

export default function PrescriptionButton() {
  const buttonRef = React.useRef(null)
  const { setActionRef, setDoctorToken, setPatient, loadingModule } = useMemed()

  React.useEffect(() => {
    function fetchDoctorToken() {
      setDoctorToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WzMyMTE3LCIzZGFhMTI4M2E2ZjY2NGM1NzQ0YWI2ZWFjMjNjZmMxMiIsIjIwMjEtMDEtMzAiLCJzaW5hcHNlLnByZXNjcmljYW8iLCJwYXJ0bmVyLjMuMjc1MTkiXQ.7qgzFR4BDQqSEJT3UMSRcNLpSlqrFvbks15azXSosms')
      setActionRef(buttonRef)
      setPatient({
        nome: 'José da Silva',
        endereco: 'Rua 1',
        cidade: 'Itapetininga',
        telefone: '+5515999999999',
        altura: 190,
        idExterno: 'ABCDE'
      })
    }

    fetchDoctorToken()
  }, [setDoctorToken, setActionRef, setPatient])

  return (
    <Button ref={buttonRef} disabled={loadingModule}>
      {loadingModule ? 'Loading...' : 'Prescrição'}
    </Button>
  )
}
