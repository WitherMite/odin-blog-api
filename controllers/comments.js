import prisma from "../config/prisma.js";

const get = (req, res, next) => {
  try {
    // grab queries from req
    // get filtered comment(s) from db
    // send comments as json
    res.json({ message: "returns list of comments" });
  } catch (err) {
    next(err);
  }
};

const post = (req, res, next) => {
  try {
    // grab fields from req
    // create comment in db
    // send created comment as json
    res.json({ message: "creates comment" });
  } catch (err) {
    next(err);
  }
};

const put = (req, res, next) => {
  try {
    // grab fields and comment id from req
    // update comment in db
    // send updated comment as json
    res.json({ message: "updates comment" });
  } catch (err) {
    next(err);
  }
};

const del = (req, res, next) => {
  try {
    // grab id from req
    // delete comment from db
    // send deleted comment id as json
    res.json({ message: "deletes comment" });
  } catch (err) {
    next(err);
  }
};

export default { get, post, put, del };
