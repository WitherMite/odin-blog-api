import HttpError from "./HttpError.js";

export default function sendErrorJSON(e, req, res, next) {
  let err = e;
  switch (e.name) {
    case "ServerError": {
      console.log(new Date().toUTCString());
      console.error(err);
      break;
    }
    case "PrismaClientValidationError": {
      // should be moved to request validation in future
      console.log(new Date().toUTCString());
      console.error(e);
      err = new HttpError(400, "Request body is malformed", {
        cause: req.body,
      });
      break;
    }
  }

  res
    .status(err.statusCode || 500)
    .json({ error: { ...err, message: err.message, cause: { ...err.cause } } });
}
