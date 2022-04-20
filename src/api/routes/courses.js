const { Router } = require("express");

const {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourseById,
  findCourseById,
} = require("../../db/controller/courses");

const courseRoutes = Router();

//get courses
courseRoutes.get("/", (req, res) => {
  const courses = getAllCourses().then(() => courses);
  res.status(200).send(courses);
});
//create courses
courseRoutes.post("/", (req, res) => {
  const course = createCourse({
    id: crypto.randomUUID(),
    ...req.body,
  });
  res.status(201).send(course);
});
//get course
courseRoutes.get("/:id", (req, res) => {
  const course = findCourseById(req.params.id).then((course) => {
    res.status(200).send(course);
  });
  return course;
});
//update course
courseRoutes.put(":/id", (req, res) => {
  const course = updateCourse(req.params.id, {
    ...req.body,
    updatedAt: new Date(),
  }).then((course) => {
    res.status(200).send(course);
  });
  return course;
});
//delete course
courseRoutes.delete("/:id", (req, res) => {
  const deletedCourse = deleteCourseById(req.params.id).then((course) => {
    res.status(204).send(course);
  });
  return deletedCourse;
});
module.exports = courseRoutes;
