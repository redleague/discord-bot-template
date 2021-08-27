const Interaction = require("../../abstract/Interaction.js");

const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Interaction {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows all the command available",
      category: 'Utility',
    });
  }


  async run({ interaction }) {
    let categories = this.client.cache.interactions.map(c => c.category).filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    });

    let embed = new MessageEmbed()
      .setAuthor(`Help Menu`, this.client.user.displayAvatarURL({ size: 512 }))
      .setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
      .setDescription(`Hey! A discord bot which does something`)
      .setFooter(`Total Commands ${this.client.cache.interactions.size}`)
      .setColor(this.client.util.color.primary);

    for (const category of categories) embed.addField(`${category} [${this.client.cache.interactions.filter(c => c.category === category).size}]`, this.client.cache.interactions.filter(c => c.category === category).map(c => `\`${c.name}\``).join(', '))

    await interaction.reply({ embeds: [embed] })
  }
};