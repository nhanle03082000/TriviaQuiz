import { Fragment } from 'react/jsx-runtime'
import './App.css'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  const routeElements = useRouteElements()

  return (
    <Fragment>
      <Provider store={store}>
        <ToastContainer />
        {routeElements}
      </Provider>
    </Fragment>
  )
}

export default App
