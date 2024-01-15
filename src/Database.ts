import { GameFinishedEventType } from './Events'
import { GameLevel } from './engine/types/GameLevel'
import { GameMode } from './engine/types/GameMode'

export type Stats = {
    hints: number
    mistakes: number
    totalTime: number
    mode: string
    level: string
}

export class Database {
    private static readonly STATS_KEY = 'stats'

    public static saveGameFinishedStats(stats: GameFinishedEventType): void {
        const gameMode: string = GameMode[stats.board.gameMode].toLowerCase()
        const gameLevel: string = GameLevel[stats.board.gameLevel].toLowerCase()
        const currentStats: Stats[] = Database.loadGameFinishedStats()
        currentStats.push({
            hints: stats.hints,
            mistakes: stats.mistakes,
            totalTime: stats.elapsedSeconds,
            mode: gameMode,
            level: gameLevel,
        })
        console.log(currentStats)
        localStorage.setItem(Database.STATS_KEY, JSON.stringify(currentStats))
    }

    public static loadGameFinishedStats(): Stats[] {
        const persistedStatsStringfied = localStorage.getItem(Database.STATS_KEY)
        if (persistedStatsStringfied) {
            return JSON.parse(persistedStatsStringfied)
        }
        return []
    }

    public static clearStats(): void {
        localStorage.clear()
    }
}
