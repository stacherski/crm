import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Crm from './Crm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Crm />
  </StrictMode>,
)
