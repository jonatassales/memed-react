import React from 'react'
import ReactDOM from 'react-dom'
import MemedProvider from 'memed-react'

import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <MemedProvider>
      <App />
    </MemedProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
