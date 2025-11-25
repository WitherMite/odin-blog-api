import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const get = async (req, res) => {
  const id = Number(req.params.userId);

  const user = await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });

  res.json(user);
};

const post = async (req, res) => {
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
};

const put = async (req, res) => {
  const { username, password, isAuthor } = req.body;
  const id = Number(req.params.userId);

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

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
};

const del = async (req, res) => {
  const id = Number(req.params.userId);

  const user = await prisma.user.delete({
    where: { id },
    omit: { password: true },
  });

  res.json({ message: `deleted user ${id}`, user });
};

export default { get, post, put, del };
