import './App.css'
import { HashRouter, Route, RouterProvider } from 'react-router-dom'
import { router } from './routes/route'
import { init as MitoInit } from '@mitojs/browser'
import { MitoProvider } from '@mitojs/react'
import { BrowserOptionsFieldsTypes, init } from '@skymointor/browser'
import { SkyMointorProvider } from '@skymointor/react'


function App() {
  const instance = init({
    dsn: 'http://localhost:3001/report',
    maxBreadcrumbs: 100,
    silentConsole: false,
    enableTraceId: true,
  } as BrowserOptionsFieldsTypes, {})

  // const mitoinstance = MitoInit({
  //   dsn: 'http://localhost:3001/report',
  //   maxBreadcrumbs: 100,
  //   silentConsole: false,
  //   enableTraceId: true,
  // })


  console.log(instance, 'instance');
  return (
    <>
      <SkyMointorProvider SkyMointorInstance={instance}>
        <RouterProvider router={router} />
      </SkyMointorProvider>
      {/* <MitoProvider MitoInstance={instance}>
        <RouterProvider router={router} />
      </MitoProvider> */}
    </>
  )
}

export default App
