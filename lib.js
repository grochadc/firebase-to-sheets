const objectToArray = (object, callback) => {
  let array = [];
  Object.keys(object).forEach(key => array.push(object[key]));
  return array;
};

function makeObjFromProperty(container, obj, prop) {
  let newKey = obj[prop];
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
  makeObjFromProperty
};
