import { Board } from './Board'
import { ClassicBoardCreator } from './ClassicBoardCreator'
import { KillerBoardCreator } from './killer/KillerBoardCreator'
import { MiniBoardCreator } from './mini/MiniBoardCreator'
import { GameLevel, GameMode } from './types/AvailableGames'

export class BoardFactory {
    private static readonly boardCreatorFactory = {
        [GameMode.KILLER]: async (gameLevel: GameLevel) => await new KillerBoardCreator().createBoard(gameLevel),
        [GameMode.MINI]: async (gameLevel: GameLevel) => await new MiniBoardCreator().createBoard(gameLevel),
        [GameMode.CLASSIC]: async (gameLevel: GameLevel) => await new ClassicBoardCreator().createBoard(gameLevel),
    }

    public async createNewBoard(gameMode: GameMode, gameLevel: GameLevel): Promise<Board> {
        return BoardFactory.boardCreatorFactory[gameMode](gameLevel)
    }
}
