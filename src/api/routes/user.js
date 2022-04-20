const { findUserById, updateUser } = require("../../db/controller/user");
const { Router } = require("express");

const userRoutes = Router();
//create user

//get user
userRoutes.get("/:id", (req, res) => {
  const user = findUserById(req.params.id).then((user) => {
    console.log(user.dataValues);
    res.status(200).send({
      name: user.dataValues.name,
      email: user.dataValues.email,
      coursesAlreadyMade: user.dataValues.coursesAlreadyMade,
      schedule: user.dataValues.schedule,
      apiKey: user.dataValues.apiKey,
    });
  });
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
