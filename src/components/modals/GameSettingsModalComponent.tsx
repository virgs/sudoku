import { faChartSimple, faGear, faPalette, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { GameMode } from "../../engine/types/GameMode"
import { NewGameSelector } from "../../input/NewGameSelector"
import { ThemeSelector } from "../../input/ThemeSelector"
import { StatsTable } from "../../math/StatsTable"
import "./GameSettingsModalComponent.css"
import { emitStartNewGame } from "../../Events"
import { Database } from "../../Database"

type GameSettingsModalComponentType = {
    show: boolean,
    onDismiss: () => void
}

export function GameSettingsModalComponent(props: GameSettingsModalComponentType) {
    const [modal, setModal] = useState()

    useEffect(() => {
        if (props.show) {
            //@ts-expect-error
            const modal = new bootstrap.Modal('#gameSettingsModal', { focus: true })
            setModal(modal)
            modal.show()

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
                        <div className="accordion accordion-flush" id="gameSettingsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-theme">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-theme" aria-expanded="false" aria-controls="collapse-theme">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faPalette} />
                                        Theme
                                    </button>
                                </h2>
                                <div id="collapse-theme" className="accordion-collapse collapse" aria-labelledby="flush-theme" data-bs-parent="#gameSettingsAccordion">
                                    <ThemeSelector></ThemeSelector>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-stats">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-stats" aria-expanded="false" aria-controls="collapse-stats">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
                                        Stats
                                    </button>
                                </h2>
                                <div id="collapse-stats" className="accordion-collapse collapse" aria-labelledby="flush-stats" data-bs-parent="#gameSettingsAccordion">
                                    <div className="accordion-body">
                                        <StatsTable mode={GameMode.CLASSIC}></StatsTable>
                                        <StatsTable mode={GameMode.KILLER}></StatsTable>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-new-game">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-new-game" aria-expanded="false" aria-controls="collapse-new-game">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faPlusCircle} />
                                        New Game
                                    </button>
                                </h2>
                                <div id="collapse-new-game" className="accordion-collapse collapse show" aria-labelledby="flush-new-game" data-bs-parent="#gameSettingsAccordion">
                                    <div className="accordion-body">
                                        <NewGameSelector onNewGameClicked={(payload) => {
                                            //@ts-expect-error
                                            modal.dispose()
                                            Database.saveGameMode(payload.mode)
                                            Database.saveGameLevel(payload.level)
                                            emitStartNewGame(payload)
                                        }}></NewGameSelector>
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