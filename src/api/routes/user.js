const { findUserById, updateUser } = require("../../db/controller/user");
const { Router } = require("express");
const authMiddleware = require("../../auth-middleware");
const userRoutes = Router();
//create user

//get user
userRoutes.get("/:id", authMiddleware, (req, res) => {
  const user = findUserById(req.params.id)
    .then((user) => {
      res.status(200).send({
        name: user.dataValues.name,
        email: user.dataValues.email,
        coursesAlreadyMade: user.dataValues.coursesAlreadyMade,
        schedule: user.dataValues.schedule,
        apiKey: user.dataValues.apiKey,
      });
    })
    .catch(() =>
      res.status(500).send({
        message: "User not found",
      })
    );
  return user;
});

//create schedule -> HERE you send the payload JSON on the PDF
userRoutes.post("/schedule", authMiddleware, (req, res) => {
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
    res.status(500).send({
      message: "Course not found",
    });
  }

  let sortedCourses = courses.sort(
    (a, b) => map[a.requiredCourse] - map[b.requiredCourse]
  );

  let ordenedCourses = [sortedCourses[0].requiredCourse];

  sortedCourses.map((course) => ordenedCourses.push(course.desiredCourse));

  let coursesMade = [];

  const user = findUserById(req.body.userId)
    .then((user) => {
      console.log(user.dataValues.schedule);

      coursesMade = user.coursesAlreadyMade.split(",");
    })
    .catch(() =>
      res.status(500).send({
        message: "User not found",
      })
    );

  const coursesNotMade = ordenedCourses.filter(
    (course) => coursesMade.indexOf(course) === -1
  );
  updateUser(req.body.userId, {
    schedule: coursesNotMade[0],
    updatedAt: new Date(),
  });

  res.status(200).send({
    message: `This is your recomended Schedule: ${ordenedCourses}\nYou are scheduled at ${ordenedCourses[0]}`,
  });
});

//finish course
userRoutes.post("/schedule/:id", authMiddleware, (req, res) => {
  const courses = [
    "Finance",
    "Investment",
    "InvestmentManagement",
    "PortfolioTheories",
    "InvestmentStyle",
    "PortfolioConstruction",
  ];
  const user = findUserById(req.params.id)
    .then((user) => {
      if (user.dataValues.coursesAlreadyMade) {
        const coursesMade = user.dataValues.coursesAlreadyMade
          .split(",")
          .push(user.dataValues.schedule)
          .join(",");
        updateUser(user.dataValues.id, {
          coursesAlreadyMade: coursesMade,
          schedule: courses[courses.indexOf(user.dataValues.schedule) + 1],
        });
      } else {
        updateUser(user.dataValues.id, {
          coursesAlreadyMade: user.dataValues.schedule,
          schedule: courses[courses.indexOf(user.dataValues.schedule) + 1],
        });
      }

      res.status(200).send({
        message: `You finish your course and we schedule you on the next`,
      });
    })
    .catch((err) => console.log(err));
  return user;
});

module.exports = userRoutes;
