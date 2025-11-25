import HttpError from "./HttpError.js";

export default function catch404(req, res, next) {
  next(new HttpError(404, `Cannot ${req.method} ${req.originalUrl}`));
}
