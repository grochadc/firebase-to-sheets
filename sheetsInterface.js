const { google } = require("googleapis");
const { getSpreadSheet } = require("./sheets-auth.js");

function request(auth, spreadsheet, values, callback) {
  const spreadsheetId = "1NPXfUfrvL6c5jXCobQFYqcd48rvg0402_pXj-5f22Bw";
  const sheets = google.sheets({ version: "v4", auth });
  const request = {
    spreadsheetId,
    auth,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    resource: { values: values }
  };
  sheets.spreadsheets.values.append(request, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Success!");
      callback();
    }
  });
}

function update(sheet, vals, callback) {
  getSpreadSheet(auth => request(auth, sheet, vals, callback));
}

module.exports = { update };

/*
sheets.spreadsheets.values.get(
  {
    spreadsheetId: "1NPXfUfrvL6c5jXCobQFYqcd48rvg0402_pXj-5f22Bw",
    range: "Sheet1!A1"
  },
  (err, res) => {
    if (err) return console.log("The API returned an error: " + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log("Name, Major:");
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map(row => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log("No data found.");
    }
  }
);
*/
