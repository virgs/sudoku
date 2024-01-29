import { faLightbulb, faStopwatch, faTrophy, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Database, Stats } from '../Database'
import { GameLevel, GameMode, modeLevelMap } from '../engine/types/AvailableGames'
import { TimeFormatter } from '../time/TimeFormatter'
import { NumberListOperations } from './NumberListOperations'
import { useEffect } from 'react'
import './StatsTable.css'

export function StatsTable() {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        Array.from([...tooltipTriggerList]).map(
            (tooltipTriggerEl) =>
                //@ts-expect-error
                new bootstrap.Tooltip(tooltipTriggerEl, {
                    trigger: 'hover',
                })
        )
    }, [])
    const databaseStats = Database.loadGameFinishedStats()

    const getModeStats = (mode: GameMode) => databaseStats.filter((stat) => stat.mode === mode)
    const getLatestTimeAModeWasFinished = (mode: GameMode) =>
        getModeStats(mode).reduce((acc, stat) => (stat.timestamp > acc ? stat.timestamp : acc), 0)

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
                                const levelStats = getLevelStats(level)
                                const getBestTimeStats = () => {
                                    const bestTimeStat = levelStats.reduce(
                                        (acc, stat) => {
                                            if (acc === undefined || stat.totalTime < acc.totalTime) {
                                                return stat
                                            }
                                            return acc
                                        },
                                        undefined as Stats | undefined
                                    )!
                                    const time = new TimeFormatter().formatDuration(Math.trunc(bestTimeStat.totalTime))
                                    const mistakes = bestTimeStat.mistakes
                                    const hints = bestTimeStat.hints
                                    return `<div class='tooltip-title'><h3>Best game</h3><span><h6>Time: ${time}</h6><h6>Mistakes: ${mistakes}</h6><h6>Hints: ${hints}</h6></div>`
                                }
                                return (
                                    <tr
                                        key={mode + level}
                                        data-bs-toggle="tooltip"
                                        data-bs-custom-class="sudoku-stats-tooltip"
                                        data-bs-html="true"
                                        data-bs-title={getBestTimeStats()}
                                    >
                                        <th scope="row" style={{ textTransform: 'capitalize', width: '10%' }}>
                                            {level.toLowerCase()}
                                        </th>
                                        <td>{levelStats.length || 0}</td>
                                        <td>{formatLevelAverageTime(level)}</td>
                                        <td>
                                            {NumberListOperations.getAverage(
                                                levelStats.map((stat) => stat.mistakes)
                                            )?.toFixed(1) ?? '-'}
                                        </td>
                                        <td>
                                            {NumberListOperations.getAverage(
                                                levelStats.map((stat) => stat.hints)
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
