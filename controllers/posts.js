import prisma from "../config/prisma.js";

const get = async (req, res, next) => {
  try {
    // grab queries from req
    // get filtered post(s) from db
    const posts = await prisma.post.findMany({});

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  try {
    // TODO: allow to instantly publish a created post
    const authorId = Number(req.body.authorId); // TODO: get from authenticated user instead
    const { title, content } = req.clientInput;

    const post = await prisma.post.create({
      data: { title, content, author: { connect: { id: authorId } } },
    });

    res.json(post);
  } catch (err) {
    next(err);
  }
};

const put = async (req, res, next) => {
  try {
    // TODO: allow publishing
    const { postId, title, content } = req.clientInput;

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        edits: { increment: 1 },
      },
    });

    res.json(post);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const { postId } = req.clientInput;

    const deletedComments = await prisma.comment.deleteMany({
      where: { postId },
    });

    const post = await prisma.post.delete({ where: { id: postId } });

    res.json({
      post,
      deletedComments,
    });
  } catch (err) {
    next(err);
  }
};

export default { get, post, put, del };
