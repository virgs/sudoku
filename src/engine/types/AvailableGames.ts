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

export const modeLevelMap: Map<GameMode, GameLevel[]> = new Map()
modeLevelMap.set(GameMode.CLASSIC, [GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD, GameLevel.EXPERT])
modeLevelMap.set(GameMode.KILLER, [GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD, GameLevel.EXPERT])
modeLevelMap.set(GameMode.JIGSAW, [GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD, GameLevel.EXPERT])
modeLevelMap.set(GameMode.MINI, [GameLevel.EASY])
