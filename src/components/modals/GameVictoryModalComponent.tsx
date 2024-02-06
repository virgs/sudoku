import { faGear, faLightbulb, faMedal, faSignal, faStopwatch, faTrophy, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { GameFinishedEventType } from '../../Events'
import { TimeFormatter } from '../../time/TimeFormatter'
import './GameVictoryModalComponent.css'
import * as bootstrap from 'bootstrap'

export function GameVictoryModalComponent(props: { data?: GameFinishedEventType; onDismiss: () => void }) {
    useEffect(() => {
        if (props.data) {
            new bootstrap.Modal('#gameVictoryModal', { focus: true }).show()

            const modalElement = document.getElementById('gameVictoryModal')
            modalElement?.addEventListener('hidden.bs.modal', () => {
                props.onDismiss()
            })
        }
    }, [props])
    if (!props.data) {
        return <></>
    }
    const flawlessVictoryHeader = () => {
        if (props.data?.hints === 0 && props.data.mistakes === 0) {
            return (
                <h3 className="modal-title text-info-emphasis text-center">
                    <FontAwesomeIcon className="font-awesome-icon" style={{ fontSize: 'unset' }} icon={faMedal} />
                    Unassisted victory
                </h3>
            )
        }
    }

    return (
        <div
            className="modal fade"
            id="gameVictoryModal"
            tabIndex={-1}
            aria-labelledby="gameVictoryModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <h1 className="modal-title text-info" id="gameVictoryModalLabel">
                        <FontAwesomeIcon className="font-awesome-icon" style={{ fontSize: 'unset' }} icon={faTrophy} />
                        Congratulations
                    </h1>
                    {flawlessVictoryHeader()}
                    <div className="modal-body">
                        <table className="table table-lg mx-auto">
                            <tbody>
                                <tr>
                                    <td className="stat-table-icon">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faGear} />
                                    </td>
                                    <td>Mode</td>
                                    <td className="stat-table-value">{props.data.board.gameMode.toLowerCase()}</td>
                                </tr>
                                <tr>
                                    <td className="stat-table-icon">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faSignal} />
                                    </td>
                                    <td>Level</td>
                                    <td className="stat-table-value">{props.data.board.gameLevel.toLowerCase()}</td>
                                </tr>
                                <tr>
                                    <td className="stat-table-icon">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faStopwatch} />
                                    </td>
                                    <td>Time</td>
                                    <td className="stat-table-value">
                                        {new TimeFormatter().formatDuration(props.data.elapsedSeconds)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="stat-table-icon">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                                    </td>
                                    <td>Hints</td>
                                    <td className="stat-table-value">{props.data.hints}</td>
                                </tr>
                                <tr>
                                    <td className="stat-table-icon">
                                        <FontAwesomeIcon className="font-awesome-icon" icon={faX} />
                                    </td>
                                    <td>Mistakes</td>
                                    <td className="stat-table-value">{props.data.mistakes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        data-bs-dismiss="modal"
                        type="button"
                        className="ripple-background"
                        data-bs-target="#gameVictoryModal"
                    >
                        <div className="circle xxlarge shade1"></div>
                        <div className="circle xlarge shade2"></div>
                        <div className="circle large shade3"></div>
                        <div className="circle mediun shade4"></div>
                        <div className="circle small shade5"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}
