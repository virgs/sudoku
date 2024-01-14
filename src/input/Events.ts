import { createEvent } from 'react-event-hook'
import { AnnotationMode } from './AnnotationMode'
import { CellType } from '../engine/types/CellType'
import { Point } from '../math/Point'

export type NumberPressedEventType = { value: number; annotationMode: AnnotationMode, hint?: boolean }
export type CellValueSetEventType = { value: number; position: Point, valueIsCorrect: boolean }
export type CellSelectedEventType = { cell: CellType; position: Point }

export const { useCellValueSetListener, emitCellValueSet } = createEvent('cell-value-set')<CellValueSetEventType>()
export const { useCurrentValueErasedListener, emitCurrentValueErased } = createEvent('current-value-erased')<void>()
export const { useNumberPressedListener, emitNumberPressed } = createEvent('number-pressed')<NumberPressedEventType>()
export const { useCellSelectedListener, emitCellSelected } = createEvent('cell-selected')<CellSelectedEventType>()
export const { useAnnotationModeChangedListener, emitAnnotationModeChanged } = createEvent('annotation-mode-changed')<AnnotationMode>()
