import Exception from './Exception';

export default {
  /**
   * Internal server error
   * @param errMsg - error message
   * @param err - server error
   * @returns - new exception
   */
  intrnlSrvrErr(errMsg: string, err: any): Exception {
    return new Exception(1, errMsg, err);
  },

  /**
   * Validation exception handler
   * @param errMsg - error message
   * @returns - new exception
   */
  validationError(errMsg: string): Exception {
    return new Exception(2, errMsg);
  },

  /**
   * Unauthenticated exception handler
   * @param errMsg - error message
   * @param errorCode - error code
   * @returns - new exception
   */
  unAuthenticatedAccess(errMsg: string, errorCode: number): Exception {
    return new Exception(errorCode, errMsg);
  },

  /**
   * To conflict error Handling
   * @param errMsg - error message
   * @returns - new exception
   */
  conflictError(errMsg: string): Exception {
    return new Exception(4, errMsg);
  },
};
