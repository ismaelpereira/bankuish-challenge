const { User } = require("../model/user");

module.exports = createUser = async (payload) => {
  const user = await User.create(payload);
  return user;
};

module.exports = updateUser = async (id, payload) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not Found");
  }
  const updatedUser = await user.update(payload);
  return updatedUser;
};

module.exports = deleteUserById = async (id) => {
  const deletedUser = await User.destroy({
    where: { id },
  });

  return !!deletedUser;
};

module.exports = findUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = getAllUsers = async () => {
  return await User.findAll();
};
