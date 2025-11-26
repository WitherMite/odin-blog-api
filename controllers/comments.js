import prisma from "../config/prisma.js";

const get = async (req, res, next) => {
  try {
    // grab queries from req
    const postId = Number(req.params.postId);
    // get filtered comment(s) from db
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    const userId = Number(req.body.userId); // TODO: get from authenticated user instead
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

const put = async (req, res, next) => {
  try {
    const id = Number(req.params.commentId);
    const { content } = req.body;

    const comment = await prisma.comment.update({
      where: { id },
      data: { content, edits: { increment: 1 } },
    });

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const id = Number(req.params.commentId);

    const comment = await prisma.comment.delete({ where: { id } });

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

export default { get, post, put, del };
