import prisma from "../config/prisma";

const get = (req, res) => {
  // grab queries from req
  // get filtered user from db
  // send user as json (without password hashes)
  res.json({ message: "returns user" });
};

const post = (req, res) => {
  // grab fields from req
  // create user in db
  // send created user as json
  res.json({ message: "creates user" });
};

const put = (req, res) => {
  // grab fields and user id from req
  // update user in db
  // send updated user as json
  res.json({ message: "updates user" });
};

const del = (req, res) => {
  // grab id from req
  // delete user from db
  // send deleted user id as json
  res.json({ message: "deletes user" });
};

export default { get, post, put, del };
