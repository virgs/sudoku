export enum GameMode {
    CLASSIC = 'CLASSIC',
    JIGSAW = 'JIGSAW',
    KILLER = 'KILLER',
    MINI = 'MINI',
}

export enum GameLevel {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    EXPERT = 'EXPERT',
}

export const modeFromString = (mode: string): GameMode | undefined =>
    Object.values(GameMode)
        .filter((key) => isNaN(Number(key)))
        .find((modeEnum) => modeEnum.toLowerCase() === mode.toLowerCase())

export const levelFromString = (level: string): GameLevel | undefined =>
    Object.values(GameLevel)
        .filter((key) => isNaN(Number(key)))
        .find((levelEnum) => levelEnum.toLowerCase() === level.toLowerCase())

export const modeLevelMap: Map<GameMode, GameLevel[]> = new Map()
modeLevelMap.set(GameMode.CLASSIC, [GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD, GameLevel.EXPERT])
modeLevelMap.set(GameMode.KILLER, [GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD, GameLevel.EXPERT])
modeLevelMap.set(GameMode.JIGSAW, [GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD, GameLevel.EXPERT])
modeLevelMap.set(GameMode.MINI, [GameLevel.EASY])
