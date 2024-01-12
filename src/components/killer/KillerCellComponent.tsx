import { CellType } from "../../engine/types/CellType";

export function KillerCellComponent(props: { cell: CellType }) {
    return <div>{props.cell.answer}</div>
}
