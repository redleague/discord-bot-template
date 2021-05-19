module.exports = class Logger {
    debug(title, message) {
        console.log(`[Process ${process.pid}] [${title}] ${message}`);
    }

    log(title, message) {
        console.log(`[Process ${process.pid}] [${title}] ${message}`);
    }

    error(error) {
        console.error(`[Process ${process.pid}]`, error);
    }
};