function getNextItem(arr, el) {
    const index = arr.indexOf(el);
    if (index < 0) {
        throw new Error("Element is not in array");
    }
    let nextel;
    if (index === arr.length - 1) {
        nextel = arr[0];
    }
    else {
        nextel = arr[index + 1];
    }
    return nextel;
}
const objectToArray = (obj) => {
    let array = [];
    Object.keys(obj).forEach(key => array.push(obj[key]));
    return array;
};
function makeObjFromProperty(container, obj, prop) {
    let newKey = obj[prop];
    if (container.hasOwnProperty(newKey)) {
        if (Array.isArray(container[newKey])) {
            container[newKey].push(obj);
        }
        else {
            throw new Error("The property is not an array");
        }
    }
    else {
        container[newKey] = [obj];
    }
    return container;
}
