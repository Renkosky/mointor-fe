import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserOptionsFieldsTypes, init } from '@skymointor/browser'
import { init as MitoInit } from '@mitojs/browser'
export const instance = init({
  dsn: 'http://localhost:3001/report',
  maxBreadcrumbs: 5,
  silentConsole: false,
  enableTraceId: true,
  maxDuplicateCount: 1,
} as BrowserOptionsFieldsTypes, {})

// export const instance = MitoInit({
//   dsn: 'http://localhost:3001/report',
//   maxBreadcrumbs: 100,
//   silentConsole: false,
//   enableTraceId: true,
// })
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
