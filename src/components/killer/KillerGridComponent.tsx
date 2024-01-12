import { KillerGridType } from "../../engine/killer/type/KillerGridType";
import { KillerCellComponent } from "./KillerCellComponent";
import "./KillerGridComponent.css"


export function KillerGridComponent(props: { grid: KillerGridType; }) {
    return <>
        {props.grid.dimension}
        <div className="virgs-grid-container">
            {Array.from(Array(props.grid.dimension).keys())
                .map((_, y) => {
                    return <span>X</span>;
                })}
        </div>
        <div className="grid">
            {props.grid.cells
                .map((line, y) => {
                    return <div className="grid-line">
                        {line.map((cell, x) => {
                            return <div className="grid-cell">
                                <KillerCellComponent cell={cell}></KillerCellComponent>
                            </div>;
                        })}
                    </div>;
                })}
        </div>;
    </>
}
