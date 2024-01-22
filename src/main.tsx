import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
        registration.unregister();
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
