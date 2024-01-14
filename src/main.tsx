import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// import 'bootswatch/dist/superhero/bootstrap.min.css'
// import 'bootswatch/dist/morph/bootstrap.min.css'
// import 'bootswatch/dist/lumen/bootstrap.min.css'
// import 'bootswatch/dist/litera/bootstrap.min.css'
import 'bootswatch/dist/sketchy/bootstrap.min.css'
// import   'bootswatch/dist/darkly/bootstrap.min.css'

import { getSudoku } from 'sudoku-gen';

// Get a sudoku of specific difficulty (easy, medium, hard, expert)
console.log(getSudoku('easy').puzzle)
console.log(getSudoku('medium').puzzle)
console.log(getSudoku('hard').puzzle)
console.log(getSudoku('expert').puzzle)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
