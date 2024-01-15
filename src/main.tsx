import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import 'bootswatch/dist/superhero/bootstrap.min.css'
// import 'bootswatch/dist/morph/bootstrap.min.css'
import 'bootswatch/dist/lumen/bootstrap.min.css'
// import 'bootswatch/dist/litera/bootstrap.min.css'
// import 'bootswatch/dist/darkly/bootstrap.min.css'
// import 'bootswatch/dist/sketchy/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
