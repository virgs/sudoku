import "./KillerGridCage.css"
import { CageType } from '../../engine/killer/types/CageType';
import { CellType } from '../../engine/types/CellType';
import { KillerCellComponent } from './KillerCellComponent';


export function KillerGridCage(props: { cell: CellType; cage: CageType; }) {
    return <div className='grid-cage'>
        <KillerCellComponent cell={props.cell}></KillerCellComponent>
    </div>;

}
