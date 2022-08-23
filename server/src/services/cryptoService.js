const cryptoDao = require('../daos/cryptoDao');

module.exports = {
    getTopCryptos: async () => {
        return cryptoDao.getTopCryptos();
    },
    updateTopCryptos: async () => {
        return cryptoDao.updateTopCryptos();
    }
}