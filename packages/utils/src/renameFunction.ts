export const renameFunction = (fn: Function, name: string, configurable: boolean = true) =>
  Object.defineProperty(fn, 'name', {
    value: name,
    configurable,
  });
