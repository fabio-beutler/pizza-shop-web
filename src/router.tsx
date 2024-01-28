import { createBrowserRouter } from 'react-router-dom'

import { AppLayout, AuthLayout } from '@/pages/_layouts'
import { NotFound } from '@/pages/404'
import { Dashboard, Orders } from '@/pages/app'
import { SignIn, SignUp } from '@/pages/auth'
import { Error } from '@/pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
