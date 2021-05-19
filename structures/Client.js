const { Client, Collection } = require('discord.js');
const Logger = require('../modules/Logger');
const CommandHandler = require('../modules/CommandHandler');
const EventHandler = require('../modules/EventHandler');
const Utils = require('./Util');

module.exports = class TuneClient extends Client {
  constructor() {
    super({
      disableMentions: 'everyone',
      messageCacheMaxSize: 50,
      messageCacheLifetime: 60,
      messageSweepInterval: 120,
      partials: [
        'MESSAGE',
        'USER',
        'GUILD_MEMBER',
        'REACTION',
        'CHANNEL'
      ],
      ws: {
        intents: [
          'GUILDS',
          'GUILD_MEMBERS',
          'GUILD_VOICE_STATES',
          'GUILD_MESSAGES',
          'GUILD_MESSAGE_REACTIONS',
        ],
      },
    });
    
    Object.defineProperty(this, 'location', { value: process.cwd() });
    
    this.logger = new Logger();
    this.snek = require('axios');
    this.config = require('../config.js');
    this.util = new Utils(this);
    
    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();

    new CommandHandler(this).build('../commands');
    new EventHandler(this).build('../events');

    Object.defineProperty(this, 'quitting', { value: false, writable: true });
    ['beforeExit', 'SIGUSR1', 'SIGUSR2', 'SIGINT', 'SIGTERM'].map(event => process.once(event, this.exit.bind(this)));
  }
    
  async login() {
    await super.login(this.config.token);
  }
   
  exit() { 
    if (this.quitting) return;
    this.quitting = true;
    this.destroy();
  }
  
  fetchCommand(cmd) {
    return this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
  }

  async send(channelID, options) {
    let channel = await this.util.fetchChannel(channelID);
    if (!channel) return;
    if (!options) throw new TypeError("Cannot send a empty message");

    let { content, ...embed } = options;

    channel.send(content, embed);
  };
}