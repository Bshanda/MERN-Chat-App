import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes.jsx'
import { Toaster } from 'react-hot-toast'
export const router = createBrowserRouter(routes)

const RouteComponent = () => {
  return (
    <RouterProvider router={router}>
      <Toaster />
    </RouterProvider>
  )
}

export default RouteComponent
