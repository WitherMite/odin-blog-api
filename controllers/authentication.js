import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import HttpError from "../errorHandlers/HttpError.js";
import passportStrategy from "../config/passportStrategy.js";

const createToken = (payload) => {
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, process.env.SECRET, options);
};

// sends a JWT the client can use to get access to protected api endpoints
const login = async (req, res, next) => {
  try {
    let user = req.user;
    if (!user) {
      const { username, password } = req.clientInput;

      user = await prisma.user.findUnique({
        where: { username },
      });

      const matches = await bcrypt.compare(password, user.password);
      user.password = undefined;
      if (!matches) {
        throw new HttpError(401, "Password invalid");
      }
    }
    const token = createToken({ username: user.username });
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

const authenticate = passportStrategy.authenticate("jwt", { session: false });

export { login, authenticate };
