import React from 'react'
import { useRoutes } from 'react-router-dom'

// TODO: Add lazy loading for the routes
const TriviaSetup = React.lazy(() => import('./pages/TriviaSetup'))
const Quiz = React.lazy(() => import('./pages/Quiz'))
const Results = React.lazy(() => import('./pages/Results'))

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <TriviaSetup />
    },
    {
      path: '/quiz',
      element: <Quiz />
    },
    {
      path: '/results',
      element: <Results />
    }
  ])
  return routeElement
}
