
//运行环境是浏览器
const inBrowser = typeof window !== 'undefined';
//浏览器 UA 判断
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isEdge = UA && UA.indexOf('edge/') > 0;
const isAndroid = (UA && UA.indexOf('android') > 0);
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

/** 除了symbol外的原始数据 */
function isStatic(value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  );
}

/** 原始数据 */
function isPrimitive(value: any): boolean {
  return isStatic(value) || typeof value === 'symbol';
}

/** 
 * 是不是引用类型的数据 
 * @example arrays, functions, objects, regexes, new Number(0),以及 new String('')
 */
function isObject(value: any): boolean {
  let type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** 判断数据是不是Object类型的数据 */
function isPlainObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/** 
 * 判断数据是不是数组类型的数据 
 */
function isArray(arr: any): boolean {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/** 判断数据是不是正则对象 */
function isRegExp(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/** 判断数据是不是时间对象 */
function isDate(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/** 判断 value 是不是浏览器内置函数 */
function isNative(value: any): boolean {
  return typeof value === 'function' && /native code/.test(value.toString());
}

/** 检查 value 是不是函数 */
function isFunction(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Function]';
}

/** 检查 value 是否为有效的类数组长度 */
function isLength(value: any): boolean {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <=
    Number.MAX_SAFE_INTEGER;
}

/** 检查 value 是否是类数组 */
function isArrayLike(value: any): boolean {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * 获取数据类型，返回结果为 Number、String、Object、Array等
 * @example getRawType([]) ==> Array
 */
function getRawType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export {
  inBrowser,
  UA,
  isIE,
  isEdge,
  isAndroid,
  isIOS,
  isChrome,
  isStatic,
  isPrimitive,
  isObject,
  getRawType,
  isPlainObject,
  isArray,
  isRegExp,
  isDate,
  isNative,
  isFunction,
  isLength,
  isArrayLike
}