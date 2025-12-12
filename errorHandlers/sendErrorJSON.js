export default function sendErrorJSON(err, req, res, next) {
  if (!err.statusCode || err.name === "ServerError") {
    console.log(new Date().toUTCString());
    console.error(err);
  }

  res.status(err.statusCode || 500).json({
    error: { name: err.name, message: err.message, cause: err.cause },
  });
}
