import { Provider } from 'react-redux'
import { Cart } from './Components/Cart'
import { Catalog } from './Components/Catalog'
import {store} from './store'
function App() {
  return (
    <Provider store={store}>
      <Catalog />
      <Cart/>
    </Provider>
 )
}

export default App
