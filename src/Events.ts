import { createEvent } from 'react-event-hook'
import { Point } from './math/Point'
import { AnnotationMode } from './input/AnnotationMode'
import { Board } from './engine/Board'

export type NumberPressedEventType = { value: number; annotationMode: AnnotationMode; hint?: boolean }
export type CellValueSetEventType = { value: number; position: Point; valueIsCorrect: boolean }
export type CellSelectedEventType = { value?: number; position: Point }
export type TimeElapsedEventType = { elapsedSeconds: number }
export type GameFinishedEventType = {
    hints: number
    mistakes: number
    elapsedSeconds: number
    board: Board
}

export type GameStartedEventType = {
    board: Board
}

export const { useTimeElapsedListener, emitTimeElapsed } = createEvent('time-elapsed')<TimeElapsedEventType>()
export const { useGameFinishedListener, emitGameFinished } = createEvent('game-finished')<GameFinishedEventType>()
export const { useGameStartedListener, emitGameStarted } = createEvent('game-started')<GameStartedEventType>()
export const { useAllCellsRevealedListener, emitAllCellsRevealed } = createEvent('all-cells-revealed')<void>()
export const { useRestartListener, emitRestart } = createEvent('restart')<void>()
export const { useOpenSettingsDialogListener, emitOpenSettingsDialog } = createEvent('open-settings-dialog')<void>()
export const { useCellValueSetListener, emitCellValueSet } = createEvent('cell-value-set')<CellValueSetEventType>()
export const { useCurrentValueErasedListener, emitCurrentValueErased } = createEvent('current-value-erased')<void>()
export const { useNumberPressedListener, emitNumberPressed } = createEvent('number-pressed')<NumberPressedEventType>()
export const { useCellSelectedListener, emitCellSelected } = createEvent('cell-selected')<CellSelectedEventType>()
export const { useAnnotationModeChangedListener, emitAnnotationModeChanged } =
    createEvent('annotation-mode-changed')<AnnotationMode>()
