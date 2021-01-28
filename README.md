# memed-react
`memed-react` é uma biblioteca desenvolvida para o ecossistema React com o objetivo de ajudar na integração com o serviço de prescrição médica online da [Memed](https://memed.com.br/). Algumas etapas da homologação já são feitas pela `lib`, como a desativação de algumas funções, adesão dos dados do paciente antes do módulo estar liberado para uso, e a criação do script em execução que carregam as instancias `MdHub` e `MdSinapsePrescricao`, responsáveis por alguns `bindings` de eventos e commandos.

## Instalação
Para instalar a biblioteca via `yarn` ou `npm` basta rodar no seu terminal:

```bash
npm install memed-react
```

ou

```bash
yarn add memed-react
```

## Uso
A biblioteca garante que o script será criado, e o módulo liberado somente quando as funções `setDoctorToken` e `setPatient` forem chamadas com os respectivos valores. As funções podem ser obtidas do hook `useMemed` após seu componente estar sendo encapsulado pelo `MemedProvider`. Você pode acionar o módulo de prescrição passando uma `ref` do seu botão ou usando as funções `showPrescription` e `showPrescription` para abrir e fechar o módulo de forma imperativa. Você consegue controlar o estado de inicialização do módulo usando a variável `loadingModule`.

### Hook useMemed
Um exemplo utilizando a `ref`:

```javascript
import React from 'react'
import Button from '@material-ui/core/Button'
import { useMemed } from 'memed-react'

import { Member } from '@patient/domain/Patient'

interface PrescriptionButtonProps {
  patient: Patient
}

export default function PrescriptionButton(props: PrescriptionButtonProps): React.ReactElement {
  const { patient } = props
  const buttonRef = React.useRef(null)
  const { setActionRef, setDoctorToken, setPatient, loadingModule } = useMemed()

  React.useEffect(() => {
    async function fetchDoctorToken() {
      const response = await fetch('<SUA_API>/doctor/token')
      const token = await response.json()
      setDoctorToken(token)
      setActionRef(buttonRef)
      setPatient({
        nome: patient.name,
        endereco: patient.address?.streetAddress || '',
        cidade: patient.address?.city || '',
        telefone: patient.phoneNumber,
        altura: patient.height,
        idExterno: patient.identityDocument
      })
    }
    
    if (patient) {
      fetchDoctorToken()
    }
  }, [patient, setDoctorToken, setActionRef, setPatient])

  return (
    <Button ref={buttonRef} disabled={loadingModule}>
      {loadingModule ? 'Loading...' : 'Prescrição'}
    </Button>
  )
}

```

O processo de criação do médico junto a memed e recuperação do token você pode ver [aqui](https://ajuda.memed.com.br/pt-BR/collections/1456059-sou-parceiro-integracao).

### Provider
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import MemedProvider from 'memed-react'

ReactDOM.render((
  <MemedProvider color="#00B8D6" scriptSrc={productionSrc} scriptId={scriptId}>
    <App />
  </MemedProvider>
), root)
```

Embora as `props` sejam opcionais, você deve trocar `scriptSrc` para o `src` de produção após pegar as chaves de produção. Do contrário o default será a `URL` de `sandbox` da memed.

## Contribuições
Toda e qualquer contribuição (PRs, issues, documentação, exemplos) será bem vinda. Crie um pull request. Utilize [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para fazer seus `commits` e siga as regras do `ghooks` após a ação. Vamos transformar a saúde no Brasil com tecnologia. :blue_heart:

## Licença
MIT

> A empresa Memed não é resposável por atualizações dessa biblioteca. Qualquer atualização da lib principal que possa quebrar a execução dessa biblioteca é de minha responsabilidade e dos colaboradores. Caso você queira fazer a integração diretamente com os módulos oficiais, acesse esse [link](https://ajuda.memed.com.br/pt-BR/articles/2519616-1-passo-a-passo-para-integracao).