const BaseEvent = require('../../abstract/Event');

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor(client) {
    super(client, { name: 'guildDelete' });
  }
  async run (guild) {
    if(!guild) return;

    this.client.logger.log("Guild Left", `=> ${guild.name} with ${guild.memberCount} members`);
  }
}