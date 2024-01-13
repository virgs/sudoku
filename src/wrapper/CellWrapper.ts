import { CellType } from '../engine/types/CellType'
import { Point } from '../math/Point'

export class CellWrapper {
    private readonly _cell: CellType
    private readonly _notes: number[]
    private readonly _position: Point
    private _selected: boolean
    private _highlighted: boolean

    public constructor(cell: CellType, position: Point) {
        this._cell = cell
        this._notes = []
        this._position = position
        this._selected = false
        this._highlighted = false
    }

    public get cell() {
        return this._cell
    }

    public get notes(): number[] {
        return this._notes
    }

    public get position(): Point {
        return this._position
    }

    public get selected(): boolean {
        return this._selected
    }

    public get highlighted(): boolean {
        return this._highlighted
    }

    public select() {
        // console.log('ihul')
        this._selected = true
    }

    public unselect() {
        // console.log('sniff')
        this._selected = false
    }

    public highlight() {
        // console.log('highlight')
        this._highlighted = true
    }

    public unhighlight() {
        this._highlighted = false
    }

    public toggleNoteValue(value: number) {
        const valueIndex = this.notes.indexOf(value)
        if (valueIndex != -1) {
            this.notes.splice(valueIndex)
        } else {
            this.notes.push(value)
            this.notes.sort()
        }
    }
}
