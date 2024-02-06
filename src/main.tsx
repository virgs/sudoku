import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GithubCorner } from './components/GithubCorner.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Removes pwa remainings
navigator.serviceWorker.getRegistrations().then(async (registrations) => {
    for (let registration of registrations) {
        const unregistration = await registration.unregister()
        console.log(unregistration)
    }
})

const router = createBrowserRouter([
    {
        path: 'sudoku/:mode?/:level?/*',
        element: (
            <>
                <GithubCorner />
                <App />
            </>
        ),
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
