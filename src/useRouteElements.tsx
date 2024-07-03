import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

// TODO: Add lazy loading for the routes
const TriviaSetup = React.lazy(() => import('./pages/TriviaSetup'))
const Quiz = React.lazy(() => import('./pages/Quiz'))
const Results = React.lazy(() => import('./pages/Results'))

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <Suspense>
          <TriviaSetup />
        </Suspense>
      )
    },
    {
      path: '/quiz',
      element: (
        <Suspense>
          <Quiz />
        </Suspense>
      )
    },
    {
      path: '/results',
      element: (
        <Suspense>
          <Results />
        </Suspense>
      )
    }
  ])
  return routeElement
}
