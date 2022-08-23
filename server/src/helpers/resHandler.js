const ValidationError = require('express-validation');
const logger = require('../config/logger/Logger.js');
const APIResponse = require('./APIResponse');
const Exception = require('./Exception');

async function sendResponse (res, result) {
  try {
    if (result && result.error && result.error.errorCode === 1) {
      return res.status(500).send(result);
    }

    // Internal server error
    if (result && result.error && result.error.errorCode === 2) {
      return res.status(400).send(result);
    }

    // Bad request
    if (result && result.error && (result.error.errorCode === 5 || result.error.errorCode === 6)) {
      return res.status(401).send(result);
    }

    // Un-authorized
    if (result && result.error && result.error.errorCode === 4) {
      return res.status(409).send(result);
    } // Conflict and in duplicate data

    // send status code 200
    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
/**
 * This function is used to send error to end-user
 * @param res - response of the request
 * @param err - exception
 */
sendError: async (res, err) => {
  try {
    logger.error(err);
    let error = err?.err;
    if (err?.error) {
      error = err.error;
    }
    let errorCode = err?.errorCode || 1;
    let msg;
    if (err instanceof ValidationError) {
      msg = err.details;
      errorCode = 2;
    } else if (!err?.msg) {
      msg = 'Internal Server Error';
    } else if (typeof err?.msg === 'string') {
      msg = err?.msg;
    } else {
      msg = err.msg;
    }

    let responseError;
    if (err instanceof ValidationError) {
      responseError = new Exception(errorCode, msg[0], error);
    } else {
      responseError = new Exception(errorCode, msg, error);
      responseError.msg = msg;
    }

    const result = new APIResponse(false, responseError);
      sendResponse(res, result);
  } catch (error) {
    logger.error(error);
  }
},

/**
 * This function is used to handle uncaught exception
 * N.B. All 4 variables are required for express to call the handler
 * @param err - error
 * @param req - request from user
 * @param res - response of request
 * @param next - next function
 */
handleError: async (err, req, res, next) => {
  sendError(res, err);
},

/**
 * This function is used to send success message response
 * @param res - response
 * @param msg - message that return with response
 */
sendSuccessWithMsg: async (res, msg) => {
  try {
    const rslt = { message: msg };
    const result = new APIResponse(true, rslt);
    sendResponse(res, result);
  } catch (error) {
    logger.error(error);
    throw error;
  }
},

/**
 * This function is used to send success response to end-user
 * @param res - response
 * @param rslt - return data
 */
sendSuccess: async(res, rslt = {}) => {
  try {
    const result = new APIResponse(true, rslt);
    sendResponse(res, result);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
}