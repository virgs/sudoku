import { Point } from '../../math/Point'
import { Board } from '../Board'
import { GameLevel, GameMode } from '../types/AvailableGames'
import { GridType } from '../types/GridType'

export class MiniBoard extends Board {
    public constructor(grid: GridType, gameLevel: GameLevel, regions: Point[][]) {
        super({
            grid: grid,
            gameMode: GameMode.MINI,
            gameLevel: gameLevel,
            regions: regions,
        })
    }

    public isNumberAllowed(value: number): boolean {
        return value >= 1 && value <= 6
    }
}
