function getNextItem(arr: string[], el: string): string {
  const index: number = arr.indexOf(el);
  if (index < 0) {
    throw new Error("Element is not in array");
  }
  let nextel: string;
  if (index === arr.length - 1) {
    nextel = arr[0];
  } else {
    nextel = arr[index + 1];
  }
  return nextel;
}

const objectToArray = (obj: object): any[] => {
  let array = [];
  Object.keys(obj).forEach(key => array.push(obj[key]));
  return array;
};

function makeObjFromProperty(
  container: object,
  obj: object,
  prop: string
): object {
  let newKey: string = obj[prop];
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
