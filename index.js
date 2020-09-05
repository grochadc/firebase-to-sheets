const fs = require("fs");
const sheetsInterface = require("./sheetsInterface");
const database = require("./firebase");
const counter = require("./counter");


teachers = {
"kzx-emdw-tac":	"Sergio",
"ucv-dwyu-reh":	"Flor",
"zym-djkh-kmc":	"Chuck",
"huz-dbiq-hry":	"Alondra",
"wqf-dmjq-qza":	"Gissel",
"dkg-zqni-phx":	"Zullet",
"jvp-ijky-bjy":	"Eri",
"xni-zart-qav":	"Felipe",
"baw-iuzn-mbj":	"Jessica",
"jao-wiqv-kmn":	"Jis"
}
const objectToArray = object => {
  let array = [];
  Object.keys(object).forEach(key => array.push(object[key]));
  return array;
};

/*
* function sheetsUpdate:
* @sheet: spreadsheet ID
* @vals: one dimension array of values
*/

/*
* function setRef
* @endpoint: spreadsheet ID
* @values: two dimensional array of values
*/
const now = new Date();
let stream = fs.createWriteStream(
  `logs/${now.getFullYear()}_${now.getMonth()}_${now.getDate()}_${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}-logs.json`,
  { flags: "a" }
);

stream.on("open", () => {
  stream.write("[");

  async function main() {
    console.log("Starting main function");
    try {
      const applicants = (await database.getRef("applicants")).val();
      if (applicants === null) {
        console.log("No applicants found in DB");
        counter(15, "Starting main function in", main);
      } else {
        let now = new Date();
        const endpoint = `synced/${now.getTime()}`;
        await database
          .setRef(endpoint, applicants)
          .then(() => database.setRef("/applicants", null));
        console.log(applicants);
        stream.write(`${JSON.stringify(applicants)},`);
        const values = objectToArray(applicants).map(applicant => [
          new Date().toGMTString(),
          applicant.applicantCode,
          applicant.code,
          applicant.firstName,
          applicant.firstLastName,
          applicant.secondLastName,
          applicant.meetLink,
          applicant.phone,
          applicant.email,
          teachers[applicant.meetLink],
          applicant.level
        ]);

        sheetsInterface.update(
          "1NPXfUfrvL6c5jXCobQFYqcd48rvg0402_pXj-5f22Bw",
          values,
          () => counter(15, "Starting main function in", main)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  main();
});

process.on("SIGINT", () => {
  console.log("\nInterrupting process\n");
  stream.write("]");
  stream.end();
  process.exit();
});
