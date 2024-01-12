import { KillerBoardCreator } from "../../engine/killer/KillerBoardCreator";
import { fileContent } from "../../engine/killer/SudokuKillerFile";
import { KillerGridComponent } from "./KillerGridComponent";

export function BoardComponent() {
    const killerBoard = new KillerBoardCreator().createBoardFromText(fileContent)
    killerBoard.printAnswers()

    return <KillerGridComponent grid={killerBoard.grid} />;
}
