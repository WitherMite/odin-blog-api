import HttpError from "../errorHandlers/HttpError.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import {
  body,
  param,
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
    param(field).isInt().withMessage("Ids must be an integer.").toInt()
  );
};

const hasOne = (...fields) => {
  const chains = fields.map((field) => body(field).exists());
  return oneOf(chains, {
    message: `Request body must include at least one of these fields: '${fields.join(
      "', '"
    )}'`,
  });
};

const username = () =>
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage("Username must be between 2 and 25 characters");

const newUsername = () =>
  username()
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
    .withMessage("Password must be at least 7 characters");

const newPassword = () => password().bail().customSanitizer(hashPassword);

const isAuthor = () =>
  body("isAuthor")
    .isBoolean()
    .withMessage("isAuthor must be a boolean")
    .optional();

const title = () =>
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be between 2 and 50 characters");

const postContent = () =>
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Content must be greater than 2 characters");

const publish = () =>
  body("publish")
    .isBoolean()
    .withMessage("publish must be a boolean")
    .optional();

const commentContent = () =>
  postContent()
    .isLength({ max: 250 })
    .withMessage("Content must be less than 250 characters");

// exported validator objects (checkValidation must come last in each middleware array)

const loginValidator = [username(), password(), checkValidation];

const userValidator = {
  get: [checkIds("userId"), checkValidation],
  post: [newUsername(), newPassword(), isAuthor(), checkValidation],
  put: [
    checkIds("userId"),
    hasOne("username", "password", "isAuthor"),
    newUsername().optional(),
    newPassword().optional(),
    isAuthor(),
    checkValidation,
  ],
  del: [checkIds("userId"), checkValidation],
};

const postValidator = {
  get: [checkValidation],
  post: [title(), postContent(), publish(), checkValidation],
  put: [
    checkIds("postId"),
    hasOne("title", "content", "publish"),
    title().optional(),
    postContent().optional(),
    publish(),
    checkValidation,
  ],
  del: [checkIds("postId"), checkValidation],
};

const commentValidator = {
  get: [checkIds("postId"), checkValidation],
  post: [checkIds("postId"), commentContent(), checkValidation],
  put: [checkIds("postId", "commentId"), commentContent(), checkValidation],
  del: [checkIds("postId", "commentId"), checkValidation],
};

export { loginValidator, userValidator, postValidator, commentValidator };
