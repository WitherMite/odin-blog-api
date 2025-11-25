export default class HttpError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.statusCode = statusCode;

    if (statusCode >= 400 && statusCode < 500) {
      this.name = "ClientError";
    } else if (statusCode >= 500 && statusCode < 600) {
      this.name = "ServerError";
    }
  }
}
