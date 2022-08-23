const Log4js = require('log4js');
const config = require('./config');

Log4js.configure(config);

module.exports = Log4js.getLogger('app');
