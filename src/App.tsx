import { Fragment } from 'react/jsx-runtime'
import './App.css'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Loading from './components/Loading'

function App() {
  const routeElements = useRouteElements()

  return (
    <Fragment>
      <Provider store={store}>
        <ToastContainer />
        <Loading />

        {routeElements}
      </Provider>
    </Fragment>
  )
}

export default App
