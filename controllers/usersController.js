const User = require("../model/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const result = await User.find();
  res.status(200).json(result);
};
//
//
const createUser = async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password)
    return res.status(400).json("username and password are required");
  const duplicate = await User.findOne({ username: username });
  if (duplicate)
    return res.status(409).json({ message: "choose another username" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const allUsers = await User.find();
  const newUser = await User.create({
    id: allUsers.length ? allUsers[allUsers.length - 1].id + 1 : 1,
    username: username,
    password: hashedPassword,
    roles: roles ? roles : [2001],
  });

  res.status(201).json(newUser);
  console.log(`user with id ${newUser.id} is created`);
};
//
//
const updateUser = async (req, res) => {
  const _id = req.body._id;
  const { password, newPassword, confirmedPassword } = req.body;
  if (!_id || !password)
    return res.status(400).json("user _id and password are required!!!");
  try {
    const foundUser = await User.findById({ _id });
    if (!foundUser) return res.status(400).json(` no user found with id ${_id}`);
    //
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      if (!newPassword && !confirmedPassword) {
        if (req.body.username) {
          foundUser.username = req.body.username;
          await foundUser.save();
          return res
            .status(201)
            .json(`user's, with _id ${foundUser._id} username only is updated`);
        } else {
          return res.json(`NO UPDATE for user with _id ${foundUser._id}`);
        }
      }
      //
      //
      //
      if (newPassword && confirmedPassword) {
        const hashedConfirmedPassword = await bcrypt.hash(confirmedPassword, 10);
        const newPasswordsMatch = await bcrypt.compare(
          newPassword,
          hashedConfirmedPassword
        );
        if (newPasswordsMatch) {
          if (req.body.username) foundUser.username = req.body.username;
          const newHashedPassword = await bcrypt.hash(newPassword, 10);
          foundUser.password = newHashedPassword;
          await foundUser.save();
          //
          return res.status(201).json(`user with _id ${foundUser.id} is updated, username and password`);
        } else {
          return res.status(400).json(`new password and confirmed password are not the same`);
        }
      } else {
        res.status(401).json({ message: "new password or confirmation of new password is missing, try again" });
      }
    } else {
      res.status(401).json({ message: "not authorized, wrong password" });
    }
  } catch (err) {
    console.log(err);
  }
};
//
//
const deleteUser = async (req, res) => {
  const _id = req.body._id;
  if (!_id) return res.status(400).json("user _id is required!!!");
  const result = await User.findByIdAndDelete(_id);
  if (!result) return res.status(400).json(` no user found with _id ${_id}`);
  
  res.status(201).json(`user with _id ${_id} is deleted`);
};
//
const getUser = async (req, res) => {
  const _id = req.params._id;
  if (!_id) return res.status(400).json("user _id is required!!!");
  const foundUser = await User.findOne({ _id: _id });
  if (!foundUser) return res.status(400).json(` no user found with id ${_id}`);
  res.status(200).json(foundUser);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
