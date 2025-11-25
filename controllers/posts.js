import prisma from "../config/prisma.js";

const get = async (req, res) => {
  // grab queries from req
  // get filtered post(s) from db
  const posts = await prisma.post.findMany({});

  res.json(posts);
};

const post = async (req, res) => {
  // TODO: allow to instantly publish a created post
  const { title, content } = req.body;
  const { authorId } = req.body; // TODO: get from authenticated user instead

  const post = await prisma.post.create({
    data: { title, content, connect: { id: authorId } },
  });

  res.json(post);
};

const put = async (req, res) => {
  // TODO: allow publihing
  const { title, content } = req.body;
  const id = req.params.postId;

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      edits: { increment: 1 },
    },
  });

  res.json(post);
};

const del = async (req, res) => {
  const id = req.params.postId;

  const deletedComments = await prisma.comment.deleteMany({
    where: { postId: id },
  });

  const post = await prisma.post.delete({ where: { id } });

  res.json({
    message: `deleted post ${id} and it's ${deletedComments.count} comments`,
    post,
    deletedComments,
  });
};

export default { get, post, put, del };
