import { CellWrapper } from '../wrapper/CellWrapper'
import './CellComponent.css'

type CellComponentProps = {
    cellWrapper: CellWrapper
    onCellClick: (cell: CellWrapper) => void
}

export function CellComponent(props: CellComponentProps) {
    const formattedNotes = props.cellWrapper.notes
        .join('')
        .match(/.{1,5}/g)
        ?.join('\n')
    return (
        <div onPointerDown={() => props.onCellClick(props.cellWrapper)} className='sudoku-cell'>
            {
                props.cellWrapper.notes.length > 0 ? (
                    <div className="sudoku-cell-notes">{formattedNotes}</div>
                ) : (
                    <div className="sudoku-cell-answer">{props.cellWrapper.cell.answer}</div>
                )
            }
        </div >
    )
}
