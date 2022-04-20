const {
  createUser,
  findUserById,
  updateUser,
} = require("../../db/controller/user");
const { Router } = require("express");
const crypto = require("crypto");
const { registerAuth } = require("../../firebase/authentication");

const userRoutes = Router();
//create user
userRoutes.post("/register", (req, res) => {
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
userRoutes.post("/auth/:id", (req, res) => {
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
  //AQUI ELE CRIA A KEY A PARTIR DA UUID
});

//get user
userRoutes.get("/:id", (req, res) => {
  const user = findUserById(req.params.id).then((user) =>
    res.status(200).send(user)
  );
  console.log(user);
  return user;
});

//create schedule
userRoutes.post("/schedule/:id", (req, res) => {
  const map = {
    Finance: 0,
    Investment: 1,
    InvestmentManagement: 2,
    PortfolioTheories: 3,
    InvestmentStyle: 4,
    PortfolioConstruction: 5,
  };

  const courses = req.body.courses;

  if (!courses) {
    throw new Error("Your JSON is incorrect, check documentation");
  }

  let sortedCourses = courses.sort(
    (a, b) => map[a.requiredCourse] - map[b.requiredCourse]
  );

  let ordenedCourses = [sortedCourses[0].requiredCourse];

  sortedCourses.map((course) => ordenedCourses.push(course.desiredCourse));

  updateUser(req.params.id, {
    schedule: ordenedCourses[0],
  });

  res.status(200).send({
    message: `This is your recomended Schedule: ${sortedCourses}\n
      You are scheduled at ${ordenedCourses[0]}`,
  });
});

//finish course

//schedule course
module.exports = userRoutes;
