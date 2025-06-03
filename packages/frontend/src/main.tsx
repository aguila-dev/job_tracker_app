import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { Auth0ProviderWithNavigate } from './layouts/Auth0ProviderWithNavigate.tsx'
import store from './redux/store'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <Auth0ProviderWithNavigate>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Auth0ProviderWithNavigate>
      </React.StrictMode>
    </Provider>
  </Router>
)
