const { google } = require("googleapis");
const { getSpreadSheet } = require("./sheets-auth.js");

function request(auth, spreadsheet, values, callback) {
  const spreadsheetId = "1NPXfUfrvL6c5jXCobQFYqcd48rvg0402_pXj-5f22Bw";
  const sheets = google.sheets({ version: "v4", auth });
  const request = {
    spreadsheetId,
    auth,
    range: "Testing!A1",
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
  console.log("\007");
  getSpreadSheet(auth => request(auth, sheet, vals, callback));
}

update("null", ["one", "two"], () => console.log("Finished"));
