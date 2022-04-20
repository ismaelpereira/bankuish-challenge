const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const app = require("./index");

const registerAuth = async (email, password) => {
  const auth = getAuth(app);
  const data = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
  return data;
};

module.exports = {
  registerAuth: registerAuth,
};
