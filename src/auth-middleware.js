const { getAuth } = require("firebase/auth");
const app = require("./firebase/index");
const admin = require("firebase-admin");

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];

  const auth = getAuth(app);

  if (request.headers.authorization) {
    try {
      admin
        .auth(app)
        .verifyIdToken(token)
        .then(() => {
          next();
        })
        .catch(() => {
          res.status(403).send("Unauthorized");
        });
    } catch (err) {
      throw new Error(err);
    }
  } else {
    res.status(403).send("Unauthorized");
  }
}

module.exports = authMiddleware;
