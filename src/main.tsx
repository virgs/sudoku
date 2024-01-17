import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.js")
        .then(serviceWorker => {
            console.log("Service Worker registered: ", serviceWorker);
        })
        .catch(error => {
            console.error("Error registering the Service Worker: ", error);
        });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
