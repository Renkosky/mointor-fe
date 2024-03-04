import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/route'
import { SkyMointorProvider } from '@skymointor/react'
import 'rc-drawer/assets/index.css'
import { instance } from './main'

import { MitoProvider } from '@mitojs/react'
function App() {
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
