const Command = require("../../abstract/Command.js");
const { utc } = require('moment');

module.exports = class Stats extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Shows statistics of the bot",
      category: 'Utility',
      aliases: ["botinfo"],
      });
  }
  
  async run(msg) {

    return this.client.send(msg.channel.id, {
      embed: {
       thumbnail: { url: this.client.user.displayAvatarURL({ size: 4096 }) },
       color: this.client.util.color.primary,
       description: `\`\`\`fix
› Version: 1.0.0
› Guilds: ${this.client.guilds.cache.size.toLocaleString()}
› Users: ${this.client.users.cache.size.toLocaleString()}
› Creation Date: ${utc(this.client.user.createdAt).format('LL')} (${utc(this.client.user.createdAt, "YYYYMMDD").fromNow()})
› Uptime: ${this.client.util.formatSeconds(process.uptime())}
› Memory Usage: ${this.client.util.formatBytes(process.memoryUsage().heapUsed)}/${this.client.util.formatBytes(process.memoryUsage().heapTotal)}
\`\`\``   
      }
    });
  };
};
