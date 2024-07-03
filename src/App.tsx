import { Fragment } from 'react/jsx-runtime'
import './App.css'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routeElements = useRouteElements()

  return (
    <Fragment>
      <ToastContainer />
      {routeElements}
    </Fragment>
  )
}

export default App
