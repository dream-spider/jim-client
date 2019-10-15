export interface IEvents {
  [index: string]: Function 
}

export class EventBus {
  private _events = {}

  $register (events: IEvents) {
    for (let eventName in events) {
      this.$on(eventName, events[eventName])
    }
  }

  $on (eventName: string, handler: Function) {
    this._events[eventName] = handler
  }

  $emit (eventName: string, ...args: any) {
    if (eventName in this._events) {
      const handler = this._events[eventName]
      if (handler && typeof handler === 'function') {
        handler.apply(this, args)
      }
    }
  }

  public getEvents () {
    return this._events
  }
}

const instance = new EventBus()

export default instance