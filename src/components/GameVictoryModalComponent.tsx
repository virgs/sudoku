import { faClose, faGear, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { GameFinishedEventType } from '../Events'
import { GameMode } from '../engine/types/GameMode'

export function GameVictoryModalComponent(props: { data?: GameFinishedEventType }) {
    useEffect(() => {
        if (props.data) {
            //@ts-ignore
            new bootstrap.Modal('#gameVictoryModal', { focus: true }).show()
        }
    }, [props])
    if (!props.data) {
        return <></>
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
                    <h1 className="modal-title ms-2" id="gameVictoryModalLabel" style={{ color: 'lightgreen' }}>
                        Congratulations!
                    </h1>
                    <div className="modal-body">
                        <p>Time: {props.data.elapsedSeconds} seconds</p>
                        <p>Hints: {props.data.hints}</p>
                        <p>Mistakes: {props.data.mistakes}</p>
                        <p>{GameMode[props.data.board.gameMode]}: {props.data.board.gameLevel}</p>
                        Your averages //highlight the currend mode/level with boldness ....
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            <FontAwesomeIcon
                                color="var(--bs-primary)"
                                className="font-awesome-icon"
                                icon={faClose}
                            />
                            <span className="me-1">Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
