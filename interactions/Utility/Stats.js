const Interaction = require("../../abstract/Interaction.js");

module.exports = class Stats extends Interaction {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Shows the stats about bot",
      category: 'Utility',
    });
  }


  async run({ interaction }) {
    const embed = {
      thumbnail: { url: this.client.user.displayAvatarURL({ size: 4096 }) },
      color: this.client.util.color.primary,
      description: `\`\`\`fix
› Version: 1.0.0
› Guilds: ${this.client.guilds.cache.size.toLocaleString()}
› Users: ${this.client.users.cache.size.toLocaleString()}
› Uptime: ${this.client.util.formatSeconds(process.uptime())}
› Memory Usage: ${this.client.util.formatBytes(process.memoryUsage().heapUsed)}/${this.client.util.formatBytes(process.memoryUsage().heapTotal)}
\`\`\``
    }
    await interaction.reply({ embeds: [embed] })
  }
};