export enum GameLevel {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    EXPERT = 'EXPERT',
}

export const gameLevels = Object.values(GameLevel).filter((key) => isNaN(Number(key)))