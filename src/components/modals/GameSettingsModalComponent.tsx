import { faChartSimple, faCheck, faGear, faPalette, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect } from "react"
import { BoardContext } from "../../App"
import { StatsTable } from "../../math/StatsTable"
import "./GameSettingsModalComponent.css"
import { GameMode } from "../../engine/types/GameMode"
import { ThemeSelector } from "../../input/ThemeSelector"

type GameSettingsModalComponentType = {
    show: boolean,
    onDismiss: () => void
}

export function GameSettingsModalComponent(props: GameSettingsModalComponentType) {
    const board = useContext(BoardContext)
    useEffect(() => {
        if (props.show) {
            //@ts-ignore
            new bootstrap.Modal('#gameSettingsModal', { focus: true }).show()

            const modalElement = document.getElementById('gameSettingsModal')
            modalElement?.addEventListener('hidden.bs.modal', () => {
                props.onDismiss()
            })
        }
    }, [props.show])
    if (!props.show) {
        return <></>
    }

    return (
        <div
            className="modal fade"
            id="gameSettingsModal"
            tabIndex={-1}
            aria-labelledby="gameSettingsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <h1 className="modal-title ms-2" id="gameSettingsModalLabel">
                        <FontAwesomeIcon className="font-awesome-icon" style={{ fontSize: 'unset' }} icon={faGear} />
                        Settings
                    </h1>
                    <div className="modal-body">
                        <div className="accordion accordion-flush">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed ps-0" style={{ boxShadow: 'none !important' }} type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-theme" aria-expanded="false" aria-controls="flush-collapse-theme">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faPalette} /> Theme
                                    </button>
                                </h2>
                                <div id="flush-collapse-theme" className="accordion-collapse collapse" style={{ boxShadow: 'none !important' }}>
                                    <div className="accordion-body px-0">
                                        <ThemeSelector></ThemeSelector>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="accordion accordion-flush">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed ps-0" style={{ boxShadow: 'none !important' }} type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-stats" aria-expanded="false" aria-controls="flush-collapse-stats">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
                                        Stats
                                    </button>
                                </h2>
                                <div id="flush-collapse-stats" className="accordion-collapse collapse" style={{ boxShadow: 'none !important' }}>
                                    <div className="accordion-body px-0">
                                        <StatsTable mode={GameMode.CLASSIC}></StatsTable>
                                        <StatsTable mode={GameMode.KILLER}></StatsTable>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion accordion-flush">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed ps-0" style={{ boxShadow: 'none !important' }} type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-new-game" aria-expanded="false" aria-controls="flush-collapse-new-game">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faPlusCircle} />
                                        New Game
                                    </button>
                                </h2>
                                <div id="flush-collapse-new-game" className="accordion-collapse collapse" style={{ boxShadow: 'none !important' }}>
                                    <div className="accordion-body px-0">

                                        <nav className="nav nav-pills nav-fill">
                                            <a className="nav-link" href="#">Mini</a>
                                            <a className="nav-link" href="#">Classic</a>
                                            <a className="nav-link active" href="#">Killer</a>
                                        </nav>
                                        <nav className="nav nav-pills nav-fill">
                                            <a className="nav-link" href="#">Easy</a>
                                            <a className="nav-link" href="#">Medium</a>
                                            <a className="nav-link" href="#">Hard</a>
                                            <a className="nav-link active" href="#">Expert</a>
                                        </nav>

                                        <button
                                            className="btn btn-sm btn-secondary"
                                            type="button"
                                            style={{ float: 'right' }}
                                        >
                                            <FontAwesomeIcon className="font-awesome-icon" icon={faCheck} />
                                            <span className="d-none me-1 d-xl-inline">Options</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}