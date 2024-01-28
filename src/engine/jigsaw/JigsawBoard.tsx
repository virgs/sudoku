import { Point } from '../../math/Point'
import { Board } from '../Board'
import { GameLevel, GameMode } from '../types/AvailableGames'
import { GridType } from '../types/GridType'

export class JigsawBoard extends Board {

    constructor(grid: GridType, level: GameLevel, regions: Point[][]) {
        super({
            grid,
            gameMode: GameMode.JIGSAW,
            gameLevel: level,
            regions: regions,
        })
    }

}
