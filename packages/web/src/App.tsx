import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CustomerPage } from './pages'

function App() {
  const [view, setView] = useState('')

  return (
    <>
      {
        !view && (
          <div>
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Event Driven Architecture</h1>
            <div className="card">
              <button onClick={() => setView('customer_site')}>
                Customer Site
              </button>
              <button onClick={() => setView('admin_site')}>
                Admin Site
              </button>
            </div>
          </div>
        )
      }
      {
        view === 'customer_site' && (
          <CustomerPage />
        )        
      }
    </>
  )
}

export default App
