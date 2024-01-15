import { useContext, useEffect, useState } from 'react'
import { CellType } from '../../engine/types/CellType'
import { AnnotationMode } from '../../input/AnnotationMode'
import { Point } from '../../math/Point'
import './CellComponent.css'
import {
    useNumberPressedListener,
    NumberPressedEventType,
    useCurrentValueErasedListener,
    emitCellValueSet,
    useCellValueSetListener,
    CellValueSetEventType,
} from '../../input/Events'
import { BoardContext } from '../../App'

type CellComponentProps = {
    cell: CellType
    selected: boolean
    position: Point
}

export function CellComponent(props: CellComponentProps) {
    const board = useContext(BoardContext)

    const [hint, setHint] = useState<boolean | undefined>()
    const [value, setValue] = useState<number | undefined>()
    const [selected, setSelected] = useState<boolean>(false)
    const [notes, setNotes] = useState<number[]>([])

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])

    useNumberPressedListener((data: NumberPressedEventType) => {
        if (selected && board.isNumberAllowed(data.value)) {
            if (data.annotationMode === AnnotationMode.PEN) {
                setHint(data.hint)
                setValue(data.value)
                emitCellValueSet({
                    value: data.value,
                    position: props.position,
                    valueIsCorrect: props.cell.answer === data.value,
                })
            } else if (data.annotationMode === AnnotationMode.PENCIL) {
                if (notes.includes(data.value)) {
                    setNotes(notes.filter((item) => item !== data.value))
                } else {
                    setNotes(notes.concat(data.value).sort())
                }
            }
        }
    })

    useCellValueSetListener((payload: CellValueSetEventType) => {
        if (payload.valueIsCorrect) {
            if (board.cellsShareSameRegion(payload.position, props.position)) {
                if (notes.includes(payload.value)) {
                    setNotes(notes.filter((item) => item !== payload.value))
                }
            }
        }
    })
    useCurrentValueErasedListener(() => {
        if (selected) {
            if (!hint) {
                setValue(undefined)
            }
            setNotes([])
        }
    })

    const divToShow = () => {
        if (props.cell.revealed) {
            return <div className="sudoku-cell-answer">{props.cell.answer}</div>
        } else if (value) {
            if (value === props.cell.answer) {
                if (hint) {
                    return <div className="sudoku-cell-answer hint">{value}</div>
                } else {
                    return <div className="sudoku-cell-answer correct">{value}</div>
                }
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
    return <div className="sudoku-cell">{divToShow()}</div>
}