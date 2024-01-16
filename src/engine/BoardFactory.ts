import { Board } from './Board'
import { ClassicBoardCreator } from './ClassicBoardCreator'
import { KillerBoardCreator } from './killer/KillerBoardCreator'
import { GameLevel, GameMode } from './types/AvailableGames'

export class BoardFactory {
    public async createNewBoard(gameMode: GameMode, gameLevel: GameLevel): Promise<Board> {
        if (gameMode === GameMode.KILLER) {
            return await new KillerBoardCreator().createBoard(gameLevel)
        }
        return await new ClassicBoardCreator().createBoard(gameLevel)
    }
}
