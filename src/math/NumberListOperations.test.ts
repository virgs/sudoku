import { describe, expect, it } from 'vitest'
import { NumberListOperations } from './NumberListOperations'

describe('NumberListOperations', () => {
    it('returns undefined for empty list', () => {
        expect(NumberListOperations.getAverage([])).toBeUndefined()
    })

    it('returns average for non-empty list', () => {
        expect(NumberListOperations.getAverage([1, 2, 3, 4])).toBe(2.5)
    })
})
