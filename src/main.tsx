import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from './provider/Theme-provider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
<RouterProvider router={router}>
</RouterProvider>
</ThemeProvider>
<Toaster></Toaster>
    </Provider>
  </StrictMode>,
)
