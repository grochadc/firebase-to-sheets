const { objectToArray, makeObjFromProperty } = require("./lib");

const applicants = [
  {
    applicantCode: "nox2qgi",
    carrera: "",
    code: "",
    course: "english",
    curso: "english",
    email: "m@m.com",
    external: true,
    firstLastName: "Paramo",
    firstName: "Miguel",
    level: 2,
    meetLink: "ym-djkh-kmc",
    phone: "3412345678",
    reubicacion: false,
    secondLastName: "Garcia"
  },
  {
    applicantCode: "9mh2p4n",
    carrera: "",
    code: "",
    course: "english",
    curso: "english",
    email: "m@m.com",
    external: true,
    firstLastName: "Preciado",
    firstName: "Juan",
    level: 2,
    meetLink: "jao-wiqv-kmn",
    phone: "3414567890",
    reubicacion: false,
    secondLastName: "Renteria"
  }
];

/*
let links = {};

if (links.hasOwnProperty(applicants[0].meetLink)) {
  if (Array.isArray(links[applicants[0].meetLink])) {
    links[applicants[0].meetLink].push(applicants[0]);
    console.log(links);
  } else {
    console.error(new Error("The property was not an array"));
  }
} else {
  console.error(new Error("No property found"));
}
*/

test("Converts an object to an array of its values", () => {
  expect(objectToArray({ a: "a", b: "b" })).toStrictEqual(["a", "b"]);
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
