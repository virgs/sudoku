import { faLightbulb, faMedal, faStopwatch, faTrophy, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Database, Stats } from '../Database'
import { GameLevel, GameMode, modeLevelMap } from '../engine/types/AvailableGames'
import { TimeFormatter } from '../time/TimeFormatter'
import { NumberListOperations } from './NumberListOperations'
import './StatsTable.css'

const thresholdToClearStat = 20

export function StatsTable() {
    const timeFormatter = new TimeFormatter()
    const [databaseStats, setDatabaseStats] = useState<Stats[]>(Database.loadGameFinishedStats())
    const [levelStatsPressingTimes, setLevelStatsPressingTimes] = useState<Map<string, number>>(
        new Map<string, number>()
    )

    function incrementLevelStatsPressingTimes(level: GameLevel, mode: GameMode): void {
        const key = `${mode}.${level}`
        const numberOfPressingTimes = levelStatsPressingTimes.get(key) ?? 0
        levelStatsPressingTimes.set(key, numberOfPressingTimes + 1)
        setLevelStatsPressingTimes(levelStatsPressingTimes)
        if (numberOfPressingTimes > thresholdToClearStat) {
            Database.clearModeLevelStats(mode, level)
            setDatabaseStats(Database.loadGameFinishedStats())
        }
    }

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        Array.from([...tooltipTriggerList]).map((tooltip) => {
            //@ts-expect-error
            new bootstrap.Tooltip(tooltip, {
                trigger: 'hover',
            })

            tooltip.addEventListener('inserted.bs.tooltip', () => {
                const titleElement = document.querySelector('.tooltip-title i')
                const icon = renderToStaticMarkup(<FontAwesomeIcon className="px-2" icon={faMedal} />)
                titleElement!.innerHTML = icon
            })
        })
    }, [])

    const getModeStats = (mode: GameMode) => databaseStats.filter((stat) => stat.mode === mode)
    const getLatestTimeModeWasPlayed = (mode: GameMode) =>
        getModeStats(mode).reduce((acc, stat) => (stat.timestamp > acc ? stat.timestamp : acc), 0)

    const renderGameMode = (mode: GameMode) => {
        const getLevelStats = (level: GameLevel) => getModeStats(mode).filter((stat) => stat.level === level)
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

                                const getUnassistedStats = () => {
                                    const unassistedStats = levelStats.filter(
                                        (stat) => stat.hints === 0 && stat.mistakes === 0
                                    )
                                    const bestTimeStat = unassistedStats.reduce(
                                        (acc, stat) => {
                                            if (acc === undefined || stat.totalTime < acc.totalTime) {
                                                return stat
                                            }
                                            return acc
                                        },
                                        undefined as Stats | undefined
                                    )
                                    const bestTime =
                                        unassistedStats.length > 0
                                            ? timeFormatter.formatDuration(Math.trunc(bestTimeStat!.totalTime))
                                            : '-'
                                    const averageTime =
                                        unassistedStats.length > 0
                                            ? timeFormatter.formatDuration(
                                                  Math.trunc(
                                                      NumberListOperations.getAverage(
                                                          unassistedStats.map((stat) => stat.totalTime)
                                                      )!
                                                  )
                                              )
                                            : '-'
                                    return renderToStaticMarkup(
                                        <div className="tooltip-title">
                                            <h3>
                                                <i data-info="dynamic-icon-template"></i>
                                                Unassisted games stats
                                            </h3>
                                            <div>
                                                <h6>Victories: {unassistedStats.length}</h6>
                                                <h6>Best time: {bestTime}</h6>
                                                <h6>Average time: {averageTime}</h6>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <tr
                                        onPointerUp={() => incrementLevelStatsPressingTimes(level, mode)}
                                        key={mode + level}
                                        data-bs-toggle="tooltip"
                                        data-bs-custom-class="sudoku-stats-tooltip"
                                        data-bs-html="true"
                                        data-bs-title={getUnassistedStats()}
                                    >
                                        <th scope="row" style={{ textTransform: 'capitalize', width: '10%' }}>
                                            {level.toLowerCase()}
                                        </th>
                                        <td>{levelStats.length || 0}</td>
                                        <td>
                                            {timeFormatter.formatDuration(
                                                Math.trunc(
                                                    NumberListOperations.getAverage(
                                                        levelStats.map((stat) => stat.totalTime)
                                                    )!
                                                )
                                            )}
                                        </td>
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
        .sort((a: GameMode, b: GameMode) => getLatestTimeModeWasPlayed(b) - getLatestTimeModeWasPlayed(a)) //Most recently played first
        .map((mode) => renderGameMode(mode))
}
