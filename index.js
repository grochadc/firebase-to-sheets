const sheetsInterface = require("./sheetsInterface");
const database = require("./firebase");
const counter = require("./counter");

const objectToArray = (object, callback) => {
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

async function main() {
  console.log("Starting main function");
  try {
    const applicants = (await database.getRef("applicants")).val();
    if (applicants === null) {
      console.log("No applicants found in DB");
      counter(15, "Starting main function in", main);
    } else {
      await database
        .setRef("/synced", applicants)
        .then(() => database.setRef("/applicants", null));
      console.log(applicants);
      const values = objectToArray(applicants).map(applicant => [
        applicant.applicantCode,
        applicant.code,
        applicant.firstName,
        applicant.firstLastName,
        applicant.secondLastName,
        applicant.meetLink,
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
