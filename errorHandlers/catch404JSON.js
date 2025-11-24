export default function catch404JSON(req, res, next) {
  return res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}
