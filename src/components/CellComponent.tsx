import "./CellComponent.css"
import { CellType } from "../engine/types/CellType";

export function CellComponent(props: { cell: CellType }) {
    const hasNotes = Math.random() > .75
    const notes = [1, 2, 3, 4].sort().join('').match(/.{1,5}/g)?.join('\n')
    return <div className="killer-cell">{hasNotes ?
        <div className="killer-cell-notes">{notes}</div> :
        <div className="killer-cell-answer">{props.cell.answer}</div>}</div>
}
