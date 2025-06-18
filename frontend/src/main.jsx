import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {routeTree} from './routing/routeTree.js'
import { AuthContextProvider } from './context/authContext/authContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthContextProvider>
   <RouterProvider router={router} />
   </AuthContextProvider>
  </Provider>
  

)
