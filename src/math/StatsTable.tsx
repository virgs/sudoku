import { faLightbulb, faStopwatch, faTrophy, faX } from '@fortawesome/free-solid-svg-icons'
import { GameLevel, GameMode, modeLevelMap } from '../engine/types/AvailableGames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NumberListOperations } from './NumberListOperations'
import { Database } from '../Database'
import { TimeFormatter } from '../time/TimeFormatter'

export function StatsTable(props: { mode: GameMode }) {
    const modeStats = Database.loadGameFinishedStats().filter((stat) => stat.mode === props.mode)
    const formattedTime = (level: GameLevel) => {
        const average = NumberListOperations.getAverage(
            modeStats.filter((stat) => stat.level === level).map((stat) => stat.totalTime)
        )
        if (average === undefined) {
            return '-'
        }
        return new TimeFormatter().formatDuration(Math.trunc(average))
    }
    return (
        <>
            <h5 style={{ textTransform: 'capitalize' }}>{`${GameMode[props.mode].toLowerCase()}`}</h5>
            <table className="table table-lg mx-auto" style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">
                            <FontAwesomeIcon className="font-awesome-icon" icon={faTrophy} />
                            <span className="d-none me-1 d-xl-inline">Victories</span>
                        </th>
                        <th scope="col">
                            <FontAwesomeIcon className="font-awesome-icon" icon={faStopwatch} />
                            <span className="d-none me-1 d-xl-inline">Time</span>
                        </th>
                        <th scope="col">
                            <FontAwesomeIcon className="font-awesome-icon" icon={faX} />
                            <span className="d-none me-1 d-xl-inline">Mistakes</span>
                        </th>
                        <th scope="col">
                            <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                            <span className="d-none me-1 d-xl-inline">Hints</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {modeLevelMap.get(props.mode)?.map((level) => {
                        return (
                            <tr key={props.mode + level}>
                                <th scope="row" style={{ textTransform: 'capitalize', width: '10%' }}>
                                    {level.toLowerCase()}
                                </th>
                                <td>{modeStats.filter((stat) => stat.level === level).length || 0}</td>
                                <td>{formattedTime(level)}</td>
                                <td>
                                    {NumberListOperations.getAverage(
                                        modeStats.filter((stat) => stat.level === level).map((stat) => stat.mistakes)
                                    )?.toFixed(2) ?? '-'}
                                </td>
                                <td>
                                    {NumberListOperations.getAverage(
                                        modeStats.filter((stat) => stat.level === level).map((stat) => stat.hints)
                                    )?.toFixed(2) ?? '-'}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
