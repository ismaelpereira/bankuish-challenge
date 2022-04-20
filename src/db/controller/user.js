import User from "../model/user";

export const createUser = async (payload) => {
  const user = await User.create(payload);
  return user;
};

export const updateUser = async (id, payload) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not Found");
  }
  const updatedUser = await user.update(payload);
  return updatedUser;
};

export const deleteUserById = async (id) => {
  const deletedUser = await User.destroy({
    where: { id },
  });

  return !!deletedUser;
};

export const findUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getAllUsers = async () => {
  return await User.findAll();
};
