# Emitter
A minimal library for implementing Event Emitter functionality.

## Features
- Written in Typescript
- Has no dependencies (e.g. jquery)
- Lightweight, 1KB
- Supports ES6

## Install
### git
```bash
git clone https://github.com/arayutw/emitter.git
cd emitter
npm install
npm run build
```

### npm
```bash
npm install @arayutw/emitter
```

### CDN
Please find various build files (esm, cjs, umd).
- [unpkg](https://unpkg.com/browse/@arayutw/emitter/dist/scripts/)
- [jsdelivr](https://cdn.jsdelivr.net/npm/@arayutw/emitter@latest/dist/scripts/)


## Usage
### load
#### ESM
```js
import Emitter from "<pathto>/emitter.esm"
```

#### UMD
```html
<script src="https://unpkg.com/@arayutw/emitter@latest/dist/scripts/emitter.js"></script>
<script>
  class A extends Emitter {}
</script>
```

### `extends`
```js
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
import Emitter from "{pathto}/emitter/src/scripts/index"

// The key names "type" and "target" are reserved.
type Events = {
  eventName: {
    eventData1: any
    eventData2: any
  }
  click: {
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

a.on("click", (event) => console.log(event));

// OK
a.emit("click", {
  x: 1,
  y: 2,
});

// NG
a.emit("click2", {
  x: 1,
  y: 2,
});

// NG
a.emit("click", {
  x: "a",
  y: 2,
});
```