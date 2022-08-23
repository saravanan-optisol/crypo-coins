export default class LoggerStreamAdapter {
  static toStream(logger) {
    return {
      write(message) {
        logger.info(message.slice(0, -1));
      },
    };
  }
}
