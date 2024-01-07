import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/layout"
import Overview from "../pages/overview/overview"
import Projects from "../pages/projects/projects"

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: '/overview', element: <Overview />, },
      { path: '/projects', element: <Projects /> }
    ]
  },
]
export const router = createBrowserRouter(routes)