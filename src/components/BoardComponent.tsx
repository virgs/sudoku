import { useEffect } from 'react'
import { BoardWrapper, CellComponentProps } from '../wrapper/BoardWrapper'
import { CellWrapper } from '../wrapper/CellWrapper'
import './BoardComponent.css'
import { GridComponent } from './GridComponent'

export function BoardComponent(props: { boardWrapper: BoardWrapper }) {
    const onCellClick = (cell: CellWrapper) => {
        props.boardWrapper.selectCell(cell)
    }

    useEffect(() => {
        // console.log('BoardComponent selected', props.boardWrapper.gridWrapper.cellsWrapper.flat().map(cell => cell.selected).join())
    }, [props, props.boardWrapper.gridWrapper.cellsWrapper.flat().map(cell => cell.selected).join()])

    useEffect(() => {
        // console.log('BoardComponent selected', props.boardWrapper.gridWrapper.cellsWrapper.flat().map(cell => cell.selected).join())
    }, [props, props.boardWrapper.count])

    const renderCellComponent = (cellComponentProps: CellComponentProps) => props.boardWrapper.renderCellComponent(cellComponentProps)
    return (
        <div className="board-component">
            <GridComponent onCellClick={onCellClick} renderCellComponent={renderCellComponent} gridWrapper={props.boardWrapper.gridWrapper} />
        </div>
    )
}
