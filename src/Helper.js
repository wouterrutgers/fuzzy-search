export default class Helper {
  static extend(...objects) {
    let target = {};

    for (let x = 0; x < objects.length; x++) {
      let object = objects[x];

      for (let property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
          if (Object.prototype.toString.call(object[property]) === '[object Object]') {
            target[property] = Helper.extend(target[property], object[property]);
          } else {
            target[property] = object[property];
          }
        }
      }
    }

    return target;
  }

  static getDescendantProperty(object, path, list = []) {
    let firstSegment;
    let remaining;
    let dotIndex;
    let value;
    let index;
    let length;

    if (!path) {
      list.push(object)
    } else {
      dotIndex = path.indexOf('.')

      if (dotIndex !== -1) {
        firstSegment = path.slice(0, dotIndex)
        remaining = path.slice(dotIndex + 1)
      } else {
        firstSegment = path
      }

      value = object[firstSegment]
      if (value !== null && value !== undefined) {
        if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
          list.push(value)
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
          for (index = 0, length = value.length; index < length; index++) {
            Helper.getDescendantProperty(value[index], remaining, list)
          }
        } else if (remaining) {
          Helper.getDescendantProperty(value, remaining, list)
        }
      }
    }

    return list
  }
}
