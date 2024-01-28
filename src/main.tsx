import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GithubCorner } from './components/GithubCorner.tsx'

navigator.serviceWorker.getRegistrations().then(async (registrations) => {
    console.log(registrations)
    for (let registration of registrations) {
        const unregistration = await registration.unregister()
        console.log(unregistration)
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GithubCorner></GithubCorner>
        <App />
    </React.StrictMode>
)
