export function debug(arg: any, propertyKey?: any, descriptor?: any) {
  if (typeof propertyKey === 'string')
    return debugFunc(arg, propertyKey, descriptor);
  else if (Array.isArray(arg) && arg.length > 0 && typeof arg[0] == 'string') {
    return (target: any) => {
      return debugClass(target, arg);
    };
  }
  else return debugClass(arg);
}
function debugClass(target: any, skip: string[] = []) {
  const methods = Object.getOwnPropertyNames(target.prototype);
  for (const method of methods) {
    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, method);
    if (skip.includes(method)) continue;
    if (descriptor && typeof descriptor.value === 'function') {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        console.log(`{${target.name}}[${method}]`, ...args);
        const result = originalMethod.apply(this, args);
        if (result || result === false) console.log(`${method} =>`, result);
        return result;
      };
      Object.defineProperty(target.prototype, method, descriptor);
    }
  }
  return target;
}
function debugFunc(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`[${propertyKey}]`, ...args);
    const result = originalMethod.apply(this, args);
    if (result || result === false) console.log(`${propertyKey} =>`, result);
    return result;
  };
  Object.defineProperty(target, propertyKey, descriptor);
}

