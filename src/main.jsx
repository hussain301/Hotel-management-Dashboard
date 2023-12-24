import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThreeDotLoader from '../Loader.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThreeDotLoader/>
    <App />
    
  </React.StrictMode>,
)
