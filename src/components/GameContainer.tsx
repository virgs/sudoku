import { ControlsComponent } from './controls/ControlsComponent'
import { Header } from './controls/Header'
import { BoardComponent } from './board/BoardComponent'
import './GameContainer.css'
import { GameFinishedEventType, useGameFinishedListener } from '../input/Events'
import { GameVictoryModalComponent } from './GameVictoryModalComponent'
import { useState } from 'react'

export function GameContainer() {
    const [gameVictoryData, setGameVictoryData] = useState<GameFinishedEventType | undefined>()
    useGameFinishedListener((payload) => {
        setGameVictoryData(payload)
    })

    return (
        <div className="container-lg p-0">
            <div className="row justify-content-center gy-3">
                <div className="col-12 col-sm-6 col-md-7 col-lg-6">
                    <div className="d-sm-none">
                        <Header></Header>
                    </div>
                    <BoardComponent />
                </div>
                <div className="col-sm-6 col-md-5 col-lg-5 align-self-start px-3 px-xl-4">
                    <div className="d-none d-sm-block">
                        <Header></Header>
                    </div>
                    <ControlsComponent></ControlsComponent>
                </div>
            </div>
            <GameVictoryModalComponent data={gameVictoryData}></GameVictoryModalComponent>
        </div>
    )
}
