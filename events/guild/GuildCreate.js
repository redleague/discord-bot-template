const BaseEvent = require('../../abstract/Event');

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor(client) {
    super(client, { name: 'guildCreate' });
  }
  async run (guild) {
    this.client.logger.log("Guild Joined", `=> ${guild.name} with ${guild.memberCount} members`);
  }
}