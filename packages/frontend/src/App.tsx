import AppRoutes from './routes/AppRoutes'
import { useAuth0Sync } from './hooks/useAuth0Sync'

function App() {
  // Initialize Auth0 sync with our Redux store
  useAuth0Sync();
  
  return <AppRoutes />
}

export default App
