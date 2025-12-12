import HttpError from "../errorHandlers/HttpError.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import {
  body,
  check,
  query,
  validationResult,
  matchedData,
  oneOf,
} from "express-validator";

// middleware to ensure all validation checks passed and put sanitized fields on the req object
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(400, "Invalid request fields", {
        cause: errors.array(),
      })
    );
  }
  req.clientInput = matchedData(req);
  return next();
};

// custom validators and sanitizers

const usernameIsUnique = async (value) => {
  const exists = await prisma.user.findUnique({ where: { username: value } });
  if (exists) {
    throw new Error();
  }
};

const hashPassword = async (password) => await bcrypt.hash(password, 10);

// reuseable validation chains
// must be functions that return a new chain or array of chains for every call
// this way the output chains can have extra validators added onto them
const checkIds = (...fields) => {
  return fields.map((field) =>
    check(field).isInt().withMessage("Ids must be an integer.").toInt()
  );
};

const hasOne = (...fields) => {
  const chains = fields.map((field) => check(field).exists());
  return oneOf(chains, {
    message: `Request must include at least one of these fields: ${fields.join(
      ", "
    )}`,
  });
};

const username = () =>
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage("Username must be between 2 and 25 characters")
    .bail()
    .custom(usernameIsUnique)
    .withMessage("Username must be unique");

const password = () =>
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .trim()
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters")
    .bail()
    .customSanitizer(hashPassword);

const isAuthor = () =>
  body("isAuthor")
    .isBoolean()
    .withMessage("isAuthor must be a boolean")
    .optional();

// exported validator objects (checkValidation must come last in each middleware array)
const userValidator = {
  get: [checkIds("userId"), checkValidation],
  post: [username(), password(), isAuthor(), checkValidation],
  put: [
    checkIds("userId"),
    hasOne("username", "password", "isAuthor"),
    username().optional(),
    password().optional(),
    isAuthor(),
    checkValidation,
  ],
  del: [checkIds("userId"), checkValidation],
};

const postValidator = {
  get: [checkValidation],
  post: [checkIds("userId"), checkValidation],
  put: [checkIds("postId"), checkValidation],
  del: [checkIds("postId"), checkValidation],
};

const commentValidator = {
  get: [checkIds("postId"), checkValidation],
  post: [checkIds("postId", "userId"), checkValidation],
  put: [checkIds("postId", "commentId"), checkValidation],
  del: [checkIds("postId", "commentId"), checkValidation],
};

export { userValidator, postValidator, commentValidator };
