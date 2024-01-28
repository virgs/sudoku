import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../App'
import {
    CellValueSetEventType,
    NumberPressedEventType,
    emitCellValueSet,
    useCellValueSetListener,
    useCurrentValueErasedListener,
    useGameFinishedListener,
    useNumberPressedListener,
} from '../../Events'
import { CellType } from '../../engine/types/CellType'
import { AnnotationMode } from '../../input/AnnotationMode'
import { Point } from '../../math/Point'
import './CellContentComponent.css'

type CellContentComponentProps = {
    cell: CellType
    selected: boolean
    position: Point
}

export function CellContentComponent(props: CellContentComponentProps) {
    const board = useContext(BoardContext)

    const [readonly, setReadonly] = useState<boolean>(false)
    const [hint, setHint] = useState<boolean | undefined>()
    const [value, setValue] = useState<number | undefined>()
    const [selected, setSelected] = useState<boolean>(false)
    const [notes, setNotes] = useState<number[]>([])

    useGameFinishedListener(() => {
        setReadonly(true)
    })

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])

    useNumberPressedListener((data: NumberPressedEventType) => {
        if (!readonly && selected && board.isNumberAllowed(data.value)) {
            if (data.annotationMode === AnnotationMode.PEN) {
                setHint(data.hint)
                setValue(data.value)
                const valueIsCorrect = props.cell.answer === data.value
                emitCellValueSet({
                    value: data.value,
                    position: props.position,
                    valueIsCorrect: valueIsCorrect,
                })
                if (valueIsCorrect) {
                    setReadonly(true)
                }
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
        if (!readonly && selected) {
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
                .match(/.{1,3}/g)
                ?.join('\n')
            return <div className="sudoku-cell-notes">{formattedNotes}</div>
        }
    }
    return <div className="sudoku-cell">{divToShow()}</div>
}
