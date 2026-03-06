import { describe, expect, it } from 'vitest'
import { UserInput, isArowKey, mapInputToNumber, mapKeyToUserInput } from './UserInput'

describe('UserInput', () => {
    it('maps key codes to user input values', () => {
        expect(mapKeyToUserInput('Digit1')).toBe(UserInput.NUM_1)
        expect(mapKeyToUserInput('Numpad9')).toBe(UserInput.NUM_9)
        expect(mapKeyToUserInput('ArrowLeft')).toBe(UserInput.ARROW_LEFT)
    })

    it('maps number inputs to numeric values', () => {
        expect(mapInputToNumber(UserInput.NUM_3)).toBe(3)
        expect(mapInputToNumber(UserInput.DELETE)).toBeUndefined()
    })

    it('identifies arrow keys', () => {
        expect(isArowKey(UserInput.ARROW_UP)).toBe(true)
        expect(isArowKey(UserInput.NUM_2)).toBe(false)
    })
})
