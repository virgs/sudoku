export type Point = {
    x: number
    y: number
}

export const pointsAreEqual = (a: Point, b: Point): boolean => {
    return a.x === b.x && a.y === b.y
}
