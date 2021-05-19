const AbstractEvent = require('../../abstract/Event');

module.exports = class ReadyEvent extends AbstractEvent {
  constructor(client) {
    super(client, { name: 'ready', once: true });
  }
  async run () {
    this.client.logger.debug(`${this.client.user.username}`, `Ready with ${this.client.guilds.cache.size} servers!`);
  }
}