import { createEvent } from "react-event-hook";
import { AnnotationMode } from "./AnnotationMode";
import { CellType } from "../engine/types/CellType";
import { Point } from "../math/Point";

export type NumberPressedEventType = { value: number, annotationMode: AnnotationMode }
export type CellSelectedEventType = { cell: CellType; position: Point }

export const { useCurrentValueErasedListener, emitCurrentValueErased } = createEvent('current-value-erased')<void>();
export const { useNumberPressedListener, emitNumberPressed } = createEvent('number-pressed')<NumberPressedEventType>();
export const { useCellSelectedListener, emitCellSelected } = createEvent('cell-selected')<CellSelectedEventType>();