const Interaction = require("../../abstract/Interaction.js");

const { MessageEmbed } = require("discord.js");

module.exports = class Ping extends Interaction {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Displays the latency",
      category: 'Utility',
    });
  }

  async run({ interaction }) {
    const message = await interaction.deferReply({ fetchReply: true });
    const embed = new MessageEmbed()
    .setColor(this.client.util.color.primary)
    .setDescription(`\`\`\`fix\nREST Latency: ${Date.now() - interaction.restTimestamp}ms\nGateway Latency: ${Math.round(interaction.guild.shard.ping)}ms\`\`\``)
    await interaction.editReply({ embeds: [embed] })
  }
};