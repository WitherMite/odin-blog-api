import prisma from "../config/prisma.js";

const get = (req, res) => {
  // grab queries from req
  // get filtered comment(s) from db
  // send comments as json
  res.json({ message: "returns list of comments" });
};

const post = (req, res) => {
  // grab fields from req
  // create comment in db
  // send created comment as json
  res.json({ message: "creates comment" });
};

const put = (req, res) => {
  // grab fields and comment id from req
  // update comment in db
  // send updated comment as json
  res.json({ message: "updates comment" });
};

const del = (req, res) => {
  // grab id from req
  // delete comment from db
  // send deleted comment id as json
  res.json({ message: "deletes comment" });
};

export default { get, post, put, del };
