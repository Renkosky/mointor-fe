import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/layout"
import Overview from "../pages/overview/overview"
import Projects from "../pages/projects/projects"
import Documents from "../pages/documents/documents"

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: '/overview', element: <Overview />, },
      { path: '/projects', element: <Projects /> },
      { path: '/document', element: <Documents /> }
    ]
  },
]
export const router = createBrowserRouter(routes)