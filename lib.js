function getNextItem(arr, el) {
  var index = arr.indexOf(el);
  if (index < 0) {
    throw new Error("Element is not in array");
  }
  var nextel;
  if (index === arr.length - 1) {
    nextel = arr[0];
  } else {
    nextel = arr[index + 1];
  }
  return nextel;
}
var objectToArray = function(obj) {
  var array = [];
  Object.keys(obj).forEach(function(key) {
    return array.push(obj[key]);
  });
  return array;
};
function makeObjFromProperty(container, obj, prop) {
  var newKey = obj[prop];
  if (container.hasOwnProperty(newKey)) {
    if (Array.isArray(container[newKey])) {
      container[newKey].push(obj);
    } else {
      throw new Error("The property is not an array");
    }
  } else {
    container[newKey] = [obj];
  }
  return container;
}

module.exports = {
  objectToArray,
  makeObjFromProperty,
  getNextItem
};
