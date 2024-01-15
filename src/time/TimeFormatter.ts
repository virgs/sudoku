export class TimeFormatter {

    public formatDuration(ms: number) {
        const days = Math.floor(ms / 86400)
        const hours = Math.floor(ms / 3600) % 24
        const minutes = (Math.floor(ms / 60) % 60).toString().padStart(2, '0')
        const seconds = (ms % 60).toString().padStart(2, '0')

        let timer = `${minutes}:${seconds}`
        if (days > 0) {
            timer = `${days}d, ${hours} h, ` + timer
        } else if (hours > 0) {
            timer = `${hours}h, ` + timer
        }
        return timer
    }
}