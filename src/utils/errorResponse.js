class ErrorResponse {
    constructor(statusCode, message = "An error occurred", data = null) {
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
    }
}

export { ErrorResponse };