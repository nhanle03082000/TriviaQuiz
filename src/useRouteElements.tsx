import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import path from './constants/path'

// TODO: Add lazy loading for the routes
const ListQuiz = React.lazy(() => import('./pages/ListQuiz'))
const Results = React.lazy(() => import('./pages/Results'))

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <Suspense>
          <ListQuiz />
        </Suspense>
      )
    },
    {
      path: path.results,
      element: (
        <Suspense>
          <Results />
        </Suspense>
      )
    }
  ])
  return routeElement
}
