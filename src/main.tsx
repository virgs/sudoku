import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { GithubCorner } from './components/GithubCorner.tsx'
import './index.css'

//Removes pwa remainings
navigator.serviceWorker.getRegistrations().then(async (registrations) => {
    for (let registration of registrations) {
        const unregistration = await registration.unregister()
        console.log(unregistration)
    }
})

const router = createHashRouter([
    //ghpage doesnt work with browser router: https://stackoverflow.com/a/71985764
    {
        path: ':mode?/:level?/*',
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
