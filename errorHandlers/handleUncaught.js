export default function handleUncaught(err, req, res, next) {
  if (err.name == "ServerError") {
    console.log(new Date().toUTCString());
    console.error(err);
  }
  res
    .status(err.statusCode || 500)
    .json({ error: { ...err, message: err.message } });
}
