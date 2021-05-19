const { Client } = require('./structures/Client');

const client = new Client();

client.login();

process.on('uncaughtException', err => console.error(err.stack));
process.on('unhandledRejection', err => console.error(err.stack));