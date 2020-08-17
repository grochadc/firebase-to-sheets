const sheetsInterface = require("./sheetsInterface");
const database = require("./firebase");

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

(async () => {
  try {
    const applicants = (await database.getRef("applicants")).val();
    await database.setRef("/synced", applicants);
    await database.setRef("/applicants", null);
    const values = objectToArray(applicants).map(applicant => [
      applicant.applicantCode,
      applicant.code,
      applicant.firstName,
      applicant.firstLastName,
      applicant.secondLastName,
      applicant.level
    ]);

    sheetsInterface.update(
      "1NPXfUfrvL6c5jXCobQFYqcd48rvg0402_pXj-5f22Bw",
      values,
      process.exit
    );
  } catch (err) {
    console.log(err);
  }
})();
