import { Events } from './Events'

export class EventEmitter {
    private static singleton?: EventEmitter = undefined

    private eventEmitter?: Map<Events, Function[]> = new Map([])
    private notListenedEvents?: Map<Events, any> = new Map([])

    private static getInstance() {
        if (!EventEmitter.singleton) {
            EventEmitter.singleton = new EventEmitter()
        }
        return EventEmitter.singleton
    }

    public static emit(event: Events, ...args: any[]): void {
        const instance = this.getInstance()
        const emitter = instance.eventEmitter?.get(event)
        if (emitter) {
            emitter.forEach((item) => item(...args))
        } else {
            instance.notListenedEvents?.set(event, args)
        }
    }

    public static on(event: Events, fn: Function): void {
        const instance = this.getInstance()
        const eventEmitter = instance.eventEmitter
        const eventListener = eventEmitter?.get(event)
        if (eventListener) {
            eventListener.push(fn)
        } else {
            eventEmitter?.set(event, [fn])
        }
    }

    public static recover(event: Events, fn: Function): void {
        const instance = this.getInstance()
        const notListenedEvent = instance.notListenedEvents?.get(event)
        if (notListenedEvent) {
            fn(notListenedEvent)
        }
        this.on(event, fn)
    }

    public static destroy() {
        delete EventEmitter.singleton?.eventEmitter
        delete EventEmitter.singleton?.notListenedEvents
        EventEmitter.singleton = undefined
    }
}
