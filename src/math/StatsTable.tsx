import { faLightbulb, faStopwatch, faTrophy, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Database } from '../Database'
import { GameLevel, GameMode, modeLevelMap } from '../engine/types/AvailableGames'
import { TimeFormatter } from '../time/TimeFormatter'
import { NumberListOperations } from './NumberListOperations'

export function StatsTable() {
    const databaseStats = Database.loadGameFinishedStats()
    const getModeStats = (mode: GameMode) => databaseStats.filter((stat) => stat.mode === mode)
    const getLatestTimeAModeWasFinished = (mode: GameMode) => getModeStats(mode)
        .reduce((acc, stat) => stat.timestamp > acc ? stat.timestamp : acc, 0)

    const renderGameMode = (mode: GameMode) => {
        const getLevelStats = (level: GameLevel) => getModeStats(mode).filter((stat) => stat.level === level)

        const formatLevelAverageTime = (level: GameLevel) => {
            const average = NumberListOperations.getAverage(getLevelStats(level).map((stat) => stat.totalTime))
            if (average === undefined) {
                return '-'
            }
            return new TimeFormatter().formatDuration(Math.trunc(average))
        }

        return (
            <div key={'stats-table-' + mode}>
                <h5 style={{ textTransform: 'capitalize' }}>{`${GameMode[mode].toLowerCase()}`}</h5>
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
                                <span className="d-none me-1 d-xl-inline">Time Average</span>
                            </th>
                            <th scope="col">
                                <FontAwesomeIcon className="font-awesome-icon" icon={faX} />
                                <span className="d-none me-1 d-xl-inline">Mistakes Average</span>
                            </th>
                            <th scope="col">
                                <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                                <span className="d-none me-1 d-xl-inline">Hints Average</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {modeLevelMap
                            .get(mode)
                            ?.filter((level) => getLevelStats(level).length > 0)
                            .map((level) => {
                                return (
                                    <tr key={mode + level}>
                                        <th scope="row" style={{ textTransform: 'capitalize', width: '10%' }}>
                                            {level.toLowerCase()}
                                        </th>
                                        <td>{getLevelStats(level).length || 0}</td>
                                        <td>{formatLevelAverageTime(level)}</td>
                                        <td>
                                            {NumberListOperations.getAverage(
                                                getLevelStats(level).map((stat) => stat.mistakes)
                                            )?.toFixed(1) ?? '-'}
                                        </td>
                                        <td>
                                            {NumberListOperations.getAverage(
                                                getLevelStats(level).map((stat) => stat.hints)
                                            )?.toFixed(1) ?? '-'}
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }

    return Array.from(modeLevelMap.keys())
        .filter((mode) => getModeStats(mode).length > 0)
        .sort((a: GameMode, b: GameMode) => getLatestTimeAModeWasFinished(b) - getLatestTimeAModeWasFinished(a)) //Most recently played first
        .map((mode) => renderGameMode(mode))
}
