const { objectToArray, makeObjFromProperty, getNextItem } = require("./lib");

test("Converts an object to an array of its values", () => {
  expect(objectToArray({ a: "a", b: "b" })).toStrictEqual(["a", "b"]);
});

describe("Gets an array and an item from the array and returns the next item in the arr", () => {
  test("First item in array", () => {
    expect(getNextItem(["a", "b", "c"], "a")).toBe("b");
  });
  test("Last item in array", () => {
    expect(getNextItem(["a", "b", "c"], "c")).toBe("a");
  });
  test("Item not found in array", () => {
    expect(() => getNextItem(["a", "b"], "c")).toThrow(
      "Element is not in array"
    );
  });
});

describe("makeObjFromProperty returns an obj with an array of objs based on a prop", () => {
  //makeObjFromProperty(container, object, prop)
  test("Empty container object", () => {
    expect(
      makeObjFromProperty({}, { someprop: "mynewkey" }, "someprop")
    ).toStrictEqual({
      mynewkey: [{ someprop: "mynewkey" }]
    });
  });
  test("Container obj with one prop", () => {
    expect(
      makeObjFromProperty(
        { mynewkey: [{ some: "data" }], anotherkey: [] },
        { someprop: "mynewkey" },
        "someprop"
      )
    ).toStrictEqual({
      mynewkey: [{ some: "data" }, { someprop: "mynewkey" }],
      anotherkey: []
    });
  });

  test("If the property is not and array throw an error", () => {
    expect(() =>
      makeObjFromProperty(
        { mynewkey: "", anotherkey: [] },
        { someprop: "mynewkey" },
        "someprop"
      )
    ).toThrow("The property is not an array");
  });
});

describe("makeObjFromProperty Real World", () => {
  test("Empty container", () => {
    expect(
      makeObjFromProperty(
        {},
        {
          applicantCode: "nox2qgi",
          firstLastName: "Paramo",
          firstName: "Miguel",
          meetLink: "ym-djkh-kmc",
          secondLastName: "Garcia"
        },
        "meetLink"
      )
    ).toStrictEqual({
      "ym-djkh-kmc": [
        {
          applicantCode: "nox2qgi",
          firstLastName: "Paramo",
          firstName: "Miguel",
          meetLink: "ym-djkh-kmc",
          secondLastName: "Garcia"
        }
      ]
    });
  });

  test("Container with one key", () => {
    expect(
      makeObjFromProperty(
        {
          "jao-wiqv-kmn": [
            {
              applicantCode: "9mh2p4n",
              firstLastName: "Preciado",
              firstName: "Juan",
              meetLink: "jao-wiqv-kmn",
              secondLastName: "Renteria"
            }
          ]
        },
        {
          applicantCode: "nox2qgi",
          firstLastName: "Paramo",
          firstName: "Miguel",
          meetLink: "ym-djkh-kmc",
          secondLastName: "Garcia"
        },
        "meetLink"
      )
    ).toStrictEqual({
      "jao-wiqv-kmn": [
        {
          applicantCode: "9mh2p4n",
          firstLastName: "Preciado",
          firstName: "Juan",
          meetLink: "jao-wiqv-kmn",
          secondLastName: "Renteria"
        }
      ],
      "ym-djkh-kmc": [
        {
          applicantCode: "nox2qgi",
          firstLastName: "Paramo",
          firstName: "Miguel",
          meetLink: "ym-djkh-kmc",
          secondLastName: "Garcia"
        }
      ]
    });
  });
});
