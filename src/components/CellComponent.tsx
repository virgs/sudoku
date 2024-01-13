import { useState } from 'react'
import { CellType } from '../engine/types/CellType'
import './CellComponent.css'

type CellComponentProps = {
    cell: CellType
    onCellClick: (cell: CellType) => void
}

export function CellComponent(props: CellComponentProps) {
    const [value, setValue] = useState<number | undefined>()
    const [notes, setNotes] = useState<number[]>([])

    const formattedNotes = notes
        .join('')
        .match(/.{1,5}/g)
        ?.join('\n')
    return (
        <div onPointerDown={() => props.onCellClick(props.cell)} className='sudoku-cell'>
            {
                notes.length > 0 ? (
                    <div className="sudoku-cell-notes">{formattedNotes}</div>
                ) : (
                    <div className="sudoku-cell-answer">{props.cell.answer}</div>
                )
            }
        </div >
    )
}
