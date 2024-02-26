import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/layout"
import Overview from "../pages/overview/overview"
import Projects from "../pages/projects/projects"
import Documents from "../pages/documents/documents"
import Detail from "../pages/projects/detail/detail"

// const routes = [
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { index: true, element: <Overview /> },
//       { path: '/overview', element: <Overview />, },
//       {
//         path: 'projects',
//         element: <Projects />,
//         children: [
//           {
//             path: 'detail',
//             element: <Detail />
//           }]
//       },
//       { path: '/document', element: <Documents /> }
//     ]
//   },

// ]

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
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/projects/detail', element: <Detail /> }, // 修改为相对路径
      { path: '/projects', element: <Projects /> }, // 修改为相对路径
    ]
  },
];

export const router = createBrowserRouter(routes)