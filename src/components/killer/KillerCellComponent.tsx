import { KillerCellType } from "../../engine/killer/type/KillerCellType";


export function KillerCellComponent(props: { cell: KillerCellType; }) {
    return <div>{props.cell.answer}</div>;
}
