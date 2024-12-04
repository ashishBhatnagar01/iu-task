"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatter = void 0;
class ResponseFormatter {
    /**
     * @param data: Data to return to client side
     * @param message
     * @param statusCode
     */
    static success(data, message, statusCode) {
        return {
            status: true,
            message,
            statusCode,
            data,
        };
    }
    /**
     * @param message
     * @param errorReason
     * @param statusCode
     */
    static failure(message, statusCode, errorReason) {
        return {
            status: false,
            message,
            statusCode,
            errorReason,
        };
    }
}
exports.ResponseFormatter = ResponseFormatter;
