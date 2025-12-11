import HttpError from "./HttpError.js";

export default function sendErrorJSON(err, req, res, next) {
  switch (err.name) {
    case "ServerError": {
      console.log(new Date().toUTCString());
      console.error(err);
      break;
    }
  }

  res
    .status(err.statusCode || 500)
    .json({ error: { message: err.message, cause: err.cause } });
}
