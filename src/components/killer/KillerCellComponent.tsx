import { CellType } from "../../engine/types/CellType";

// width: var(--cell-size);
// height: var(--cell-size);

export function KillerCellComponent(props: { cell: CellType }) {
    return <div style={{}}>{props.cell.answer}</div>
}
