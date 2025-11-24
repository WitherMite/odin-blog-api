import prisma from "../config/prisma.js";

const get = (req, res) => {
  // grab queries from req
  // get filtered post(s) from db
  // send posts as json
  res.json({ message: "returns list of posts" });
};

const post = (req, res) => {
  // grab fields from req
  // create post in db
  // send created post as json
  res.json({ message: "creates post" });
};

const put = (req, res) => {
  // grab fields and post id from req
  // update post in db
  // send updated post as json
  res.json({ message: "updates post" });
};

const del = (req, res) => {
  // grab id from req
  // delete post from db
  // send deleted post id as json
  res.json({ message: "deletes post" });
};

export default { get, post, put, del };
