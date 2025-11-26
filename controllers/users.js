import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: {
        posts: true,
        comments: true,
      },
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      omit: { password: true },
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const put = async (req, res, next) => {
  try {
    const { username, password, isAuthor } = req.body;
    const id = Number(req.params.userId);

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const data = {
      username,
      password: hashedPassword,
      isAuthor,
    };

    const user = await prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });

    res.json({
      user,
      passwordUpdated: !!hashedPassword,
    });
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const id = Number(req.params.userId);

    const user = await prisma.user.delete({
      where: { id },
      omit: { password: true },
    });

    res.json({ message: `deleted user ${id}`, user });
  } catch (err) {
    next(err);
  }
};

export default { get, post, put, del };
