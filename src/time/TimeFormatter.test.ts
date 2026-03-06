import { describe, expect, it } from 'vitest'
import { TimeFormatter } from './TimeFormatter'

describe('TimeFormatter', () => {
    const formatter = new TimeFormatter()

    it('formats minutes and seconds for short durations', () => {
        expect(formatter.formatDuration(75)).toBe(`01' 15"`)
    })

    it('formats hours for long durations', () => {
        expect(formatter.formatDuration(3661)).toBe(`1h 01' 01"`)
    })

    it('formats days and hours for very long durations', () => {
        expect(formatter.formatDuration(90061)).toBe(`1d 1h 01' 01"`)
    })
})
