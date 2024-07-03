import { useRoutes } from 'react-router-dom'

export default function useRouteElement() {
  const routeElement = useRoutes([])
  return routeElement
}
