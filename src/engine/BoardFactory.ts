import { Board } from "./Board"
import { ClassicBoardCreator } from "./ClassicBoardCreator"
import { KillerBoardCreator } from "./killer/KillerBoardCreator"
import { GameLevel } from "./types/GameLevel"
import { GameMode } from "./types/GameMode"

export class BoardFactory {
    public async createNewBoard(gameMode: GameMode, gameLevel: GameLevel): Promise<Board> {
        if (gameMode === GameMode.KILLER) {
            return await new KillerBoardCreator().createBoard(gameLevel)
        }
        //  if (gameMode === GameMode.CLASSIC) {
        return await new ClassicBoardCreator().createBoard(gameLevel)
        // }
    }
}