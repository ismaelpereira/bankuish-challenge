const Course = require("../model/courses");

module.exports = createCourse = async (payload) => {
  const course = Course.create(payload);
  return course;
};

module.exports = updateCourse = async (id, payload) => {
  const course = Course.findByPk(id);
  if (!course) {
    throw new Error("Course not found");
  }

  const updatedCourse = await (await course).update(payload);
  return updatedCourse;
};

module.exports = deleteCourseById = async (id) => {
  const deletedCourse = await Course.destroy({
    where: { id },
  });

  return !!deletedCourse;
};

module.exports = findCourseById = async (id) => {
  const course = await Course.findByPk(id);

  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

module.exports = getAllCourses = async () => {
  return await Course.findAll();
};
