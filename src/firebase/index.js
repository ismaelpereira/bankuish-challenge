const firebase = require("firebase-admin");
const credentials = require("./credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://bankuish-challenge.firebaseio.com",
});

module.exports = firebase;
