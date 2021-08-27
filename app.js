const BotClient = require("./structures/Client");

const { Intents } = require("discord.js");
const { GUILDS, GUILD_MESSAGES, GUILD_INTEGRATIONS } = Intents.FLAGS;

const clientOptions = {
  partials: [
    "USER",
    "GUILD_MEMBER",
    "MESSAGE",
  ],
  intents: [
    GUILDS,
    GUILD_MESSAGES,
    GUILD_INTEGRATIONS
  ]
}

const client = new BotClient(clientOptions);

client.login();

process.on('uncaughtException', err => console.error(err.stack));
process.on('unhandledRejection', err => console.error(err.stack));