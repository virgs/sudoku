export class NumberListOperations {
    public static getAverage(values: number[]): number | undefined {
        if (values.length === 0) {
            return undefined
        }
        return values.reduce((acc, value) => acc + value, 0) / values.length
    }
}
