import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/route'
import { BrowserOptionsFieldsTypes, init } from '@skymointor/browser'
import { SkyMointorProvider } from '@skymointor/react'


function App() {
  const instance = init({
    dsn: 'http://localhost:3001/report',
    maxBreadcrumbs: 100,
    silentConsole: false,
    enableTraceId: true,
    maxDuplicateCount: 1,
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
