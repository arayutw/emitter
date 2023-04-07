# Emitter
A minimal library for implementing Event Emitter functionality.

## Install
### npm
```bash
npm install "@arayutw/emitter"
npm run build
```

## Usage
### `extends`
```js
import {Emitter} from "@arayutw/emitter"

class A extends Emitter {
  constructor() {
    super();
  }
}

const a = new A;
```

### `on()`
```js
const handler = (event) => {
  // {target: a, type: "click", x: 12, y: 34}
  console.log(event);
}

a.on("click", handler, {
  once: false,
});
```

### `off()`
```js
a.off("click", handler);
```

### `emit()`
```js
a.emit("click", {
  x: 12,
  y: 34,
});
```

### `destroy`
`off("*")` removes all events.
```js
a.off("*");
```


## Typescript
Development with Typescript is also convenient. Please define Generics (two arguments) when extending it.

| Argument | Example | Description |
| --- | --- | --- |
| 1 | `A` | The value of `event.target`. |
| 2 | `{eventName: {data1: number, data2: string}}` | An object where the keys are event names and the values are objects containing event data. The key names "type" and "target" are reserved. |

```ts
import {Emitter} from "@arayutw/emitter"

type Events = {
  eventName: {
    eventData1: any
    eventData2: any
  }
  click: {
    // The key names "type" and "target" are reserved.
    x: number
    y: number
  }
  mousedown: {
    // some data
  }
}

class A extends Emitter<A, Events> {
  constructor() {
    super();
  }
}

const a = new A;

// Ok
a.emit("click", {
  x: 1,
  y: 2,
});

// Error
a.emit("click2", {
  x: 1,
  y: 2,
});

// Error
a.emit("click", {
  x: "a",
  y: 2,
});
```