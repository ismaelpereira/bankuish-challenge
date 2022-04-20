import Course from "../model/courses";

export const createCourse = async (payload) => {
  const course = Course.create(payload);
  return course;
};

export const updateCourse = async (id, payload) => {
  const course = Course.findByPk(id);
  if (!course) {
    throw new Error("Course not found");
  }

  const updatedCourse = await (await course).update(payload);
  return updatedCourse;
};

export const deleteCourseById = async (id) => {
  const deletedCourse = await Course.destroy({
    where: { id },
  });

  return !!deletedCourse;
};

export const findCourseById = async (id) => {
  const course = await Course.findByPk(id);

  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

export const getAllCourses = async () => {
  return await Course.findAll();
};
