const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
require("dotenv").config();

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://filex-5726c.firebaseio.com"
});
console.log("initialized DB");
const db = admin.database();

const getRef = endpoint => {
  return db.ref(endpoint).once("value");
};

const setRef = (endpoint, values) => {
  return db.ref(endpoint).set(values);
};

module.exports = { getRef, setRef };
