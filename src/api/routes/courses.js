const { Router } = require("express");
const {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourseById,
  findCourseById,
} = require("../../db/controller/courses");
const crypto = require("crypto");

const courseRoutes = Router();

//get courses
courseRoutes.get("/", (req, res) => {
  const courses = getAllCourses().then((course) =>
    res.status(200).send(course)
  );
});
//create courses
courseRoutes.post("/", (req, res) => {
  const course = createCourse({
    id: crypto.randomUUID(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((course) => res.status(201).send(course))
    .catch(() =>
      res.status(500).send({
        message: "Cannot create Course",
      })
    );
});
//get course
courseRoutes.get("/:id", (req, res) => {
  const course = findCourseById(req.params.id)
    .then((course) => {
      res.status(200).send(course);
    })
    .catch(() =>
      res.status(500).send({
        message: "User not found",
      })
    );
  return course;
});
//update course
courseRoutes.put(":/id", (req, res) => {
  const course = updateCourse(req.params.id, {
    ...req.body,
    updatedAt: new Date(),
  })
    .then((course) => {
      res.status(200).send(course);
    })
    .catch(() =>
      res.status(500).send({
        message: "Cannot update Course",
      })
    );
  return course;
});
//delete course
courseRoutes.delete("/:id", (req, res) => {
  const deletedCourse = deleteCourseById(req.params.id)
    .then((course) => {
      res.status(204).send(course);
    })
    .catch(() =>
      res.status(500).send({
        message: "Course not found",
      })
    );
  return deletedCourse;
});
module.exports = courseRoutes;
