import { useEffect, useState } from 'react'
import { CellType } from '../engine/types/CellType'
import { AnnotationMode } from '../input/AnnotationMode'
import { Point } from '../math/Point'
import './CellComponent.css'
import { useNumberPressedListener, NumberPressedEventType, useCurrentValueErasedListener } from '../input/Events'

type CellComponentProps = {
    cell: CellType
    selected: boolean
    position: Point
}

export function CellComponent(props: CellComponentProps) {
    const [selected, setSelected] = useState<boolean>(props.selected)
    const [value, setValue] = useState<number | undefined>()
    const [notes, setNotes] = useState<number[]>([])

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])

    useNumberPressedListener((data: NumberPressedEventType) => {
        if (selected) {
            if (data.annotationMode === AnnotationMode.PEN) {
                setValue(data.value)
            } else if (data.annotationMode === AnnotationMode.PENCIL) {
                if (notes.includes(data.value)) {
                    setNotes(notes.filter(item => item !== data.value))
                } else {
                    setNotes(notes.concat(data.value))
                }
            }
        }
    })
    useCurrentValueErasedListener(() => {
        if (selected) {
            setValue(undefined)
            setNotes([])
        }
    })

    const divToShow = () => {
        if (props.cell.revealed) {
            return <div className="sudoku-cell-answer">{props.cell.answer}</div>
        } else if (value) {
            if (value === props.cell.answer) {
                return <div className="sudoku-cell-answer correct">{value}</div>
            } else {
                return <div className="sudoku-cell-answer wrong">{value}</div>
            }
        } else if (notes.length > 0) {
            const formattedNotes = notes
                .join('')
                .match(/.{1,5}/g)
                ?.join('\n')
            return <div className="sudoku-cell-notes">{formattedNotes}</div>
        }
    }
    return (
        <div className="sudoku-cell">
            {divToShow()}
        </div>
    )
}
