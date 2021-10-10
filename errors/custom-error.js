
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Constructor function
const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
}

module.exports = {
    CustomAPIError,     // Used in error-handler.js
    createCustomError   // Used in tasks.js
}