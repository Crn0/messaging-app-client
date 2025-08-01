import CustomError from "./custom-error";

export default class ApiError extends CustomError {
  constructor({ message, response, data, code, name = "Api Error", isOperational = true }) {
    super(name, isOperational, message, code, response, data);
  }
}
