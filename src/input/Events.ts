import { createEvent } from 'react-event-hook'
import { Point } from '../math/Point'
import { AnnotationMode } from './AnnotationMode'

export type NumberPressedEventType = { value: number; annotationMode: AnnotationMode; hint?: boolean }
export type CellValueSetEventType = { value: number; position: Point; valueIsCorrect: boolean }
export type CellSelectedEventType = { value?: number; position: Point }

export const { useRestartListener, emitRestart } = createEvent('restart')<void>()
export const { useCellValueSetListener, emitCellValueSet } = createEvent('cell-value-set')<CellValueSetEventType>()
export const { useCurrentValueErasedListener, emitCurrentValueErased } = createEvent('current-value-erased')<void>()
export const { useNumberPressedListener, emitNumberPressed } = createEvent('number-pressed')<NumberPressedEventType>()
export const { useCellSelectedListener, emitCellSelected } = createEvent('cell-selected')<CellSelectedEventType>()
export const { useAnnotationModeChangedListener, emitAnnotationModeChanged } =
    createEvent('annotation-mode-changed')<AnnotationMode>()
