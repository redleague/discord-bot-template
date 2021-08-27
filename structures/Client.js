const { Client, Collection } = require("discord.js");
const EventHandler = require("../handler/Event");
const InteractionHandler = require("../handler/Interaction");
const Logger = require("../modules/Logger");
const Util = require("./Util");

const config = require("../config");

class BotClient extends Client {
  constructor(clientOptions) {
    super(clientOptions);

    this.config = config;
    this.util = new Util(this);
    this.logger = new Logger();

    new EventHandler(this).build("../events");
    new InteractionHandler(this).build("../interactions");

    this.cache = {
      events: new Collection(),
      interactions: new Collection(),
    }

    /* dangerous stuff */
    Object.defineProperty(this, "quitting", { value: false, writable: true });
    ['beforeExit', 'SIGUSR1', 'SIGUSR2', 'SIGINT', 'SIGTERM'].map(event => process.once(event, this.exit.bind(this)));
  }

  getInteraction(cmd) {
    return this.cache.interactions.get(cmd.toLowerCase())
  }

  async login() {
    await super.login(config.token);
  }

  exit() {
    if (this.quitting) return;
    this.quitting = true;
    this.destroy();
  }
}

module.exports = BotClient;