export default class Helper {
  static getDescendantProperty(object, path, list = []) {
    let firstSegment;
    let remaining;
    let dotIndex;
    let value;
    let index;
    let length;

    if (path) {
      dotIndex = path.indexOf('.');

      if (dotIndex === -1) {
        firstSegment = path;
      } else {
        firstSegment = path.slice(0, dotIndex);
        remaining = path.slice(dotIndex + 1);
      }

      value = object[firstSegment];
      if (value !== null && typeof value !== 'undefined') {
        if (! remaining && (typeof value === 'string' || typeof value === 'number')) {
          list.push(value);
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
          for (index = 0, length = value.length; index < length; index++) {
            Helper.getDescendantProperty(value[index], remaining, list);
          }
        } else if (remaining) {
          Helper.getDescendantProperty(value, remaining, list);
        }
      }
    } else {
      list.push(object);
    }

    return list;
  }
}
