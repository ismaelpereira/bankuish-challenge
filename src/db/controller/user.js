const User = require("../model/user");

const createUser = async (payload) => {
  const user = await User.create(payload);
  return user;
};

const updateUser = async (id, payload) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not Found");
  }
  const updatedUser = await user.update(payload);
  return updatedUser;
};

const deleteUserById = async (id) => {
  const deletedUser = await User.destroy({
    where: { id },
  });

  return !!deletedUser;
};

const findUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const getAllUsers = async () => {
  return await User.findAll();
};

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
  findUserById: findUserById,
  getAllUsers: getAllUsers,
};
