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
    const { title, content } = req.body;
    const authorId = Number(req.body.authorId); // TODO: get from authenticated user instead

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
    const { title, content } = req.body;
    const id = Number(req.params.postId);

    const post = await prisma.post.update({
      where: { id },
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
    const id = Number(req.params.postId);

    const deletedComments = await prisma.comment.deleteMany({
      where: { postId: id },
    });

    const post = await prisma.post.delete({ where: { id } });

    res.json({
      message: `deleted post ${id} and it's ${deletedComments.count} comments`,
      post,
      deletedComments,
    });
  } catch (err) {
    next(err);
  }
};

export default { get, post, put, del };
