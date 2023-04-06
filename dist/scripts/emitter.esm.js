/**!
* emitter 0.0.1
* MIT License
* Copyright (c) 2023 Yuta Arai
**/
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
class Emitter {
  constructor() {
    this.Emitter$items = [];
  }
  on(name, handler, options) {
    this.off(name, handler);
    this.Emitter$items.push([name, handler, options]);
  }
  off(name, handler) {
    for (let a = this.Emitter$items, i = 0; a.length > i; i++) {
      if (name === a[i][0] && handler === a[i][1]) {
        a.splice(i--, 1);
      }
    }
  }
  emit(name, event) {
    this.Emitter$items.forEach(entry => {
      var _a;
      if (name === entry[0]) {
        entry[1](__spreadProps(__spreadValues({}, event), {
          target: this,
          type: name
        }));
        if ((_a = entry[2]) == null ? void 0 : _a.once) this.off(name, entry[1]);
      }
    });
  }
}
export { Emitter };
