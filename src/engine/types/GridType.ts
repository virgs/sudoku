import { Point } from '../../math/Point'
import { CellType } from './CellType'

export interface GridType {
    cells: CellType[][]
    dimension: Point
}
