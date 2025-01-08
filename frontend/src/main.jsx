import React from 'react'
import ReactDOM from 'react-dom/client'
import FrontPage from './pages/FirstPage'
import './index.css'
import NewProject from './pages/SecondPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FrontPage />
    <NewProject />
  </React.StrictMode>,
)
