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

const router = createHashRouter(
    [
        {
            path: 'sudoku/:mode?/:level?/*',
            element: (
                <>
                    <GithubCorner />
                    <App />
                </>
            ),
            loader: () => {
                console.log('first')
                return 2
            },
        },
        {
            path: '/sudoku/:mode?/:level?/*',
            element: (
                <>
                    <GithubCorner />
                    <App />
                </>
            ),
            loader: () => {
                console.log('second')
                return 2
            },
        },
        {
            path: '/:mode?/:level?/*',
            element: (
                <>
                    <GithubCorner />
                    <App />
                </>
            ),
            loader: () => {
                console.log('third')
                return 2
            },
        },
        {
            path: '*',
            element: (
                <>
                    <GithubCorner />
                    <App />
                </>
            ),
            loader: () => {
                console.log('fourth')
                return 2
            },
        },
    ],
    {
        // basename: '/sudoku'
    }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
