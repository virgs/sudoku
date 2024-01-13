import { useEffect } from 'react'
import { BoardWrapper, CellComponentProps } from '../wrapper/BoardWrapper'
import './BoardComponent.css'
import { GridComponent } from './grid/GridComponent'

export function BoardComponent(props: { boardWrapper: BoardWrapper }) {
    useEffect(() => {
        // console.log('BoardComponent selected', props.boardWrapper.gridWrapper.cellsWrapper.flat().map(cell => cell.selected).join())
    }, [props, props.boardWrapper.gridWrapper.cellsWrapper.flat().map(cell => cell.selected).join()])

    useEffect(() => {
        // console.log('BoardComponent selected', props.boardWrapper.gridWrapper.cellsWrapper.flat().map(cell => cell.selected).join())
    }, [props, props.boardWrapper.count])

    const renderCellComponent = (cellComponentProps: CellComponentProps) => props.boardWrapper.renderCellComponent(cellComponentProps)
    return (
        <div className="board-component">
            <GridComponent renderCellComponent={renderCellComponent} gridWrapper={props.boardWrapper.gridWrapper} />
        </div>
    )
}
