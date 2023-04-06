type Type = string | number | symbol

type Handler<T1, T2, T3> = (event: {
  target: T1
  type: T2
} & T3) => any

type Options = {
  once: boolean
}

export class Emitter<T1, T2 extends Record<Type, { [key: string]: any }>> {
  private readonly Emitter$items: [
    name: Type,
    listener: any,
    options?: Options
  ][] = []

  public on<U extends keyof T2>(name: U, handler: Handler<T1, U, T2[U]>, options?: Options): void {
    this.off(name, handler);
    this.Emitter$items.push([name, handler, options,]);
  }

  public off<U extends keyof T2>(name: U, handler: Handler<T1, U, T2[U]>): void {
    for (let a = this.Emitter$items, i = 0; a.length > i; i++) {
      if (name === a[i][0] && handler === a[i][1]) {
        a.splice(i--, 1);
      }
    }
  }

  public emit<U extends keyof T2>(name: U, event: T2[U]): void {
    this.Emitter$items.forEach((entry) => {
      if (name === entry[0]) {
        entry[1]({
          ...event,
          target: this,
          type: name,
        });

        if (entry[2]?.once) this.off(name, entry[1]);
      }
    });
  }
}