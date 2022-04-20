//const data = {
//userId: "30ecc27b-9df7-4dd3-b52f-d001e79bd035",
//courses: [
//{
//desiredCourse: "InvestmentManagement",
// requiredCourse: "Investment",
//},
//{
//desiredCourse: "PortfolioConstruction",
// requiredCourse: "PortfolioTheories",
//},
//{
//desiredCourse: "PortfolioTheories",
//requiredCourse: "Investment",
//},
//{
//desiredCourse: "InvestmentStyle",
//requiredCourse: "InvestmentManagement",
//},
//{
//   desiredCourse: "Investment",
//    requiredCourse: "Finance",
//   },
//  ],
//};
const { Router } = require("express");
import { createCourse, getAllCourses } from "../../db/controller/courses";

const courseRoutes = Router();

//get courses
courseRoutes.get((req, res) => {
  const courses = getAllCourses().then(() => courses);
  res.status(200).send(courses);
});
//create courses
courseRoutes.post((req, res) => {
  const course = createCourse({
    id: crypto.randomUUID(),
    ...req.body,
  });
});
//get course

//update course
//delete course
