module.exports = class ForbiddenException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenException';
    this.statusCode = 403;
    this.errorMessage = message;
  }
};
