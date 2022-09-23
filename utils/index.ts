import { isPrimitive, isArrayLike, isPlainObject, getRawType } from '../typeCheck/index';

/** 防抖 */
export class Debounced {
  /**
   * @param {Function} func 需要包装的函数
   * @param {number} delay 延迟时间，单位ms
   * @param {boolean} immediate 是否默认执行一次(第一次不延迟)
   */
  public use = (func: Function, delay: number, immediate: boolean = false): Function => {
    let timer: number | undefined;
    return (...args: any) => {
      if (immediate) {
        func.apply(this, args); // 确保引用函数的指向正确，并且函数的参数也不变
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  }
}

/** 节流 */
export class Throttle {
  private timer: number | undefined;
  private stop: boolean = false;
  private death: boolean = false;

  /**
   * @param {Function} func 需要包装的函数
   * @param {number} delay 延迟时间，单位ms
   * @param {boolean} immediate 是否默认执行一次(第一次不延迟)
   */
  public use(func: Function, delay: number, immediate: boolean = false): Function {
    let flag = true;
    const self = this;
    return (...args: any) => {
      if (this.death) {
        return func.apply(this, args);

      }
      if (this.stop) {
        return func.apply(this, args);

      }
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }
      if (!flag) {
        return;
      }
      flag = false;
      self.timer = setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, delay);
    }
  }

  // 销毁
  public destroy() {
    this.death = true;
    this.stop = true;
    if (!!this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
  // 开启
  public open() {
    if (!this.death) {
      this.stop = false;
    }
  }
  // 关闭
  public close() {
    this.stop = true;
  }
}

/**
 * 深拷贝
 * 这只是深拷贝的一个简单版本
 * @param {object} source
 * @returns {object}
 */
export function deepClone(source: any): any {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone Function' as ErrorOptions);
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  })
  return targetObj;
}

/** 原始类型，时间、正则、错误、数组、对象的克隆规则 */
export function cloneAll(value: any, deep: any) {
  if (isPrimitive(value)) {
    return value
  }

  if (isArrayLike(value)) { //是类数组
    value = Array.prototype.slice.call(value)
    return deep ? value.map(item => cloneAll(item, deep)) : value
  } else if (isPlainObject(value)) { //是对象
    let target = {}, key: string | number;
    for (key in value) {
      value.hasOwnProperty(key) && (target[key] = deep ? cloneAll(value[key], deep) : value[key])
    }
    return target
  }

  let type = getRawType(value)

  switch (type) {
    case 'Date':
    case 'RegExp':
    case 'Error': value = new window[type](value); break;
  }
  return value
}