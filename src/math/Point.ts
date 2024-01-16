export type Point = {
    x: number
    y: number
}

export const pointsAreEqual = (a: Point, b: Point): boolean => {
    return a.x === b.x && a.y === b.y
}

export const squaredDistanceBetweenPoints = (a: Point, b: Point): number => {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}
