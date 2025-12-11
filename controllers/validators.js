import HttpError from "../errorHandlers/HttpError.js";
import {
  body,
  check,
  query,
  validationResult,
  matchedData,
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

// reuseable validation chains
const checkIds = (...fields) => {
  return fields.map((field) =>
    check(field).isInt().withMessage("Ids must be an integer.").toInt()
  );
};

// exported validator objects (checkValidation must come last in each middleware array)
const userValidator = {
  get: [checkIds("userId"), checkValidation],
  post: [checkValidation],
  put: [checkIds("userId"), checkValidation],
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
