const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyBnmpLSqfl3mRUh-wVhPefZKGO3-g28t_M",

  authDomain: "bankuish-challenge-ea8d9.firebaseapp.com",

  projectId: "bankuish-challenge-ea8d9",

  storageBucket: "bankuish-challenge-ea8d9.appspot.com",

  messagingSenderId: "676229679757",

  appId: "1:676229679757:web:1926615190db087dcc70c4",

  measurementId: "G-32X4J4HB9C",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

module.exports = app;
