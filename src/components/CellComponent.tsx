import "./CellComponent.css"
import { CellType } from "../engine/types/CellType";

type CellComponentProps = {
    cell: CellType;
    onCellClick: (cell: CellType) => void;
};

export function CellComponent(props: CellComponentProps) {
    const hasNotes = Math.random() > .75
    const notes = [1, 2, 3, 4].sort().join('').match(/.{1,5}/g)?.join('\n')
    return <div onPointerDown={() => props.onCellClick(props.cell)} className="killer-cell">{hasNotes ?
        <div className="killer-cell-notes">{notes}</div> :
        <div className="killer-cell-answer">{props.cell.answer}</div>}</div>
}
