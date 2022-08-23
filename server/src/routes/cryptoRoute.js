const Router = require('express');
const cryptoService = require('../services/cryptoService.js');
const resHndlr = require('../helpers/resHandler.js');

const cryptoRouter = Router();

//initial api call to get the latest crypto detials
cryptoRouter.get('/getTopCrypto', async (req, res) => {
    try {
      console.log('REOUTE');
      const result = await cryptoService.getTopCryptos();
      resHndlr.sendSuccess(res, result);
    } catch (err) {
      resHndlr.sendError(res, err);
    }
  });

module.exports = cryptoRouter;