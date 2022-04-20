const {
  createUser,
  findUserById,
  updateUser,
} = require("../../db/controller/user");
const { Router } = require("express");

const userRoutes = Router();
//create user
userRoutes.post("/register", (req, res) => {
  const user = req.body;
  try {
    createUser({
      id: crypto.randomUUID(),
      ...req.body,
    });
  } catch (err) {
    throw new Error("Error on registration: ", err);
  }
  res.status(201).send(req.body);
});

//authenticate user
userRoutes.post("/auth/:id", (req, res) => {
  const uuid = crypto.randomUUID();
  try {
    const user = findUserById(req.params.id).then(() => user);
    const updatedUser = updateUser(user.id, {
      apiKey: uuid,
    }).then(() => updatedUser);
  } catch (err) {
    throw new Error("Error: ", err);
  }
  //AQUI ELE CRIA A KEY A PARTIR DA UUID
  res.status(200).send({
    message: `Your API Key is ${uuid}`,
  });
});

//get apiKey
userRoutes.get("/auth/:id", (req, res) => {
  try {
    const user = findUserById(req.params.id).then(() => user);
    req.statusCode(200).send(user);
  } catch (err) {
    throw new Error("Error: ", err);
  }
});

//get user
userRoutes.get("/user/:id", (req, res) =>
  res.status(200).send(() => {
    const user = findUserById(req.params.id).then(() => user);
    return user;
  })
);

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
