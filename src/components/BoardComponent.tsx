import './BoardComponent.css';
import { GridComponent } from './grid/GridComponent';

export function BoardComponent() {
    return (
        <div className="board-component">
            <GridComponent />
        </div>
    )
}
