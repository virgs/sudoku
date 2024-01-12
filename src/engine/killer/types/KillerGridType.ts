import { CellType } from '../../types/CellType'
import { GridType } from '../../types/GridType'
import { CageType } from './CageType'

export interface KillerGridType extends GridType {
    cells: CellType[][]
    cages: CageType[]
}
