const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const authMiddleware = require("./auth-middleware");
const router = require("./api/routes");
const { createUser } = require("./db/controller/user");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", authMiddleware);
app.use("/course", authMiddleware);
app.use(router);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World",
  });
});

app.listen(4000, () => {
  console.log("App is listening port 4000");
});

app.post("/register", (req, res) => {
  const user = req.body;
  try {
    createUser({
      id: crypto.randomUUID(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (err) {
    console.log(err.message);
    throw new Error("Error on registration: " + err.message);
  }
  res.status(201).send(req.body);
});

//authenticate user
app.post("/auth/:id", (req, res) => {
  try {
    const user = findUserById(req.params.id).then((user) => {
      const auth = registerAuth(user.dataValues.email, "password").then(
        (data) => {
          res.status(200).send(JSON.stringify(data));
          console.log(data.stsTokenManager.accessToken);
          const payload = {
            apiKey: data.stsTokenManager.accessToken,
            updatedAt: new Date(),
          };
          updateUser(req.params.id, payload)
            .then((data) => console.log(data))
            .catch((err) => console.log(err.message));
        }
      );
    });
  } catch (err) {
    throw new Error("Error: " + err.message);
  }
});
