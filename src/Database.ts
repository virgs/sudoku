import { GameFinishedEventType } from './Events'
import { GameLevel, GameMode } from './engine/types/AvailableGames'

export type Stats = {
    hints: number
    mistakes: number
    totalTime: number
    mode: string
    level: string
}

export class Database {
    private static readonly STATS_KEY = 'stats'
    private static readonly THEME_KEY = 'theme'
    private static readonly GAME_MODE_KEY = 'game-mode'
    private static readonly GAME_LEVEL_KEY = 'game-level'

    public static saveGameFinishedStats(stats: GameFinishedEventType): void {
        const gameMode: string = GameMode[stats.board.gameMode]
        const gameLevel: string = GameLevel[stats.board.gameLevel]
        const currentStats: Stats[] = Database.loadGameFinishedStats()
        currentStats.push({
            hints: stats.hints,
            mistakes: stats.mistakes,
            totalTime: stats.elapsedSeconds,
            mode: gameMode,
            level: gameLevel,
        })
        localStorage.setItem(Database.STATS_KEY, JSON.stringify(currentStats))
    }

    public static loadGameFinishedStats(): Stats[] {
        const persistedStatsStringfied = localStorage.getItem(Database.STATS_KEY)
        if (persistedStatsStringfied) {
            return JSON.parse(persistedStatsStringfied)
        }
        return []
    }

    public static saveTheme(themeName: string) {
        localStorage.setItem(Database.THEME_KEY, themeName)
    }

    public static loadThemeOrDefault(defaultValue: string): string {
        return localStorage.getItem(Database.THEME_KEY) || defaultValue
    }

    static saveGameMode(mode: GameMode) {
        localStorage.setItem(Database.GAME_MODE_KEY, mode)
    }

    static saveGameLevel(level: GameLevel) {
        localStorage.setItem(Database.GAME_LEVEL_KEY, level)
    }

    static loadGameModeOrDefault(defaultMode: GameMode): GameMode {
        const mode = localStorage.getItem(Database.GAME_MODE_KEY)
        return mode != undefined ? (mode as GameMode) : defaultMode
    }

    static loadGameLevelOrDefault(defaultLevel: GameLevel): GameLevel {
        const level = localStorage.getItem(Database.GAME_LEVEL_KEY)
        return level != undefined ? (level as GameLevel) : defaultLevel
    }

    public static clearStats(): void {
        localStorage.clear()
    }
}
