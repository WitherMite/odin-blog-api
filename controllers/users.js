import HttpError from "../errorHandlers/HttpError.js";
import prisma from "../config/prisma.js";
import { login } from "./authentication.js";

// change to get one or more users public data, or to get exactly one user's detailed data
const get = async (req, res, next) => {
  try {
    const { userId } = req.clientInput;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
      include: {
        posts: true,
        comments: true,
      },
    });
    if (!user) {
      throw new HttpError(404, "User does not exist.", { cause: { userId } });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  try {
    const { username, password } = req.clientInput;

    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
      omit: { password: true },
    });
    req.user = user;
    login(req, res, next);
  } catch (err) {
    next(err);
  }
};

const put = async (req, res, next) => {
  try {
    const { userId, username, password, isAuthor } = req.clientInput;

    const data = {
      username,
      password,
      isAuthor,
    };

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      omit: { password: true },
    });

    res.json({
      user,
      passwordUpdated: !!password,
    });
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const { userId } = req.clientInput;

    const deletedPosts = await prisma.post.deleteMany({
      where: { authorId: userId },
    });

    const deletedComments = await prisma.comment.deleteMany({
      where: { userId },
    });

    const user = await prisma.user.delete({
      where: { id: userId },
      omit: { password: true },
    });

    res.json({ user, deletedPosts, deletedComments });
  } catch (err) {
    next(err);
  }
};

export default { get, post, put, del };
