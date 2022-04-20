const Course = require("../model/courses");

const createCourse = async (payload) => {
  const course = Course.create(payload);
  return course;
};

const updateCourse = async (id, payload) => {
  const course = Course.findByPk(id);
  if (!course) {
    throw new Error("Course not found");
  }

  const updatedCourse = await (await course).update(payload);
  return updatedCourse;
};

const deleteCourseById = async (id) => {
  const deletedCourse = await Course.destroy({
    where: { id },
  });

  return !!deletedCourse;
};

const findCourseById = async (id) => {
  const course = await Course.findByPk(id);

  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

const getAllCourses = async () => {
  return await Course.findAll();
};

module.exports = {
  createCourse: createCourse,
  updateCourse: updateCourse,
  deleteCourseById: deleteCourseById,
  findCourseById: findCourseById,
  getAllCourses: getAllCourses,
};
