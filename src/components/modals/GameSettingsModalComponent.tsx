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
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faPalette} />
                                        Theme
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <ThemeSelector></ThemeSelector>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
                                        Stats
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <StatsTable mode={GameMode.CLASSIC}></StatsTable>
                                        <StatsTable mode={GameMode.KILLER}></StatsTable>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faPlusCircle} />
                                        New Game
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse show" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
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