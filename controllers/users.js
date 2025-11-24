import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const get = async (req, res) => {
  const id = Number(req.params.userId);

  const user = await prisma.user.findUnique({ where: { id } });

  res.json({ id: user.id, username: user.username, isAuthor: user.isAuthor });
};

const post = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.json({ id: user.id, username: user.username, isAuthor: user.isAuthor });
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
  });

  res.json({
    updatedUser: {
      id: user.id,
      username: user.username,
      isAuthor: user.isAuthor,
    },
    passwordUpdated: !!hashedPassword,
  });
};

const del = async (req, res) => {
  const id = Number(req.params.userId);

  await prisma.user.delete({ where: { id } });

  res.json({ message: `deleted user ${id}` });
};

export default { get, post, put, del };
