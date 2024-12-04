export class ResponseFormatter {
  /**
   * @param data: Data to return to client side
   * @param message
   * @param statusCode
   */

  static success(data: any, message: string, statusCode: number) {
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

  static failure(
    message: string,
    statusCode: number,
    errorReason: string | any
  ) {
    return {
      status: false,
      message,
      statusCode,
      errorReason,
    };
  }
}
