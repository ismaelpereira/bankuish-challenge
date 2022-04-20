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

//create schedule -> HERE you send the payload JSON on the PDF
userRoutes.post("/schedule/", (req, res) => {
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

  let coursesMade = [];

  const user = findUserById(rq.body.userId)
    .then((user) => {
      coursesMade = user.coursesAlreadyMade.split(",");
    })
    .catch((user) => console.log("User does not exists"));

  const coursesNotMade = ordenedCourses.filter(
    (course) => coursesMade.indexOf(course) === -1
  );
  updateUser(req.body.userId, {
    schedule: coursesNotMade[0],
    pdatedAt: new Date(),
  });

  res.status(200).send({
    message: `This is your recomended Schedule: ${sortedCourses}\n
      You are scheduled at ${ordenedCourses[0]}`,
  });
});

//finish course
userRoutes.put("/schedule/:id", (req, res) => {
  const courses = [
    "Finance",
    "Investment",
    "InvestmentManagement",
    "PortfolioTheories",
    "InvestmentStyle",
    "PortfolioConstruction",
  ];

  let coursesMade = [];

  const user = findUserById(rq.body.userId)
    .then((user) => {
      coursesMade = user.coursesAlreadyMade.split(",");
      coursesMade.push(user.schedule);
    })
    .catch((user) => console.log("User does not exists"));

  const updatedUser = updateUser(req.param.id, {
    schedule: courses[courses.indexOf(coursesMade[coursesMade.length - 1]) + 1],
    pdatedAt: new Date(),
  });

  res.status(200).send({
    message: `You finish course ${courseMade[coursesMade.length - 1]}.\n
    You will start ${
      courses[courses.indexOf(coursesMade[coursesMade.length - 1]) + 1]
    }`,
  });
});

//schedule course
module.exports = userRoutes;
