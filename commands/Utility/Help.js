const Command = require("../../abstract/Command.js");
const { MessageEmbed } = require('discord.js');

module.exports = class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows all the commands available",
      usage: ["[command]"],
      category: 'Utility',
      aliases: ["help", "h"],
      });
  }
  
  async run(msg, args) {
    if (args.length) {
      let cmd = this.client.fetchCommand(args[0]);

      if (!cmd) return this.client.send(msg.channel.id, {embed: {
        color: this.client.util.color.error,
        description: `No command found with name or alias \`${args[0]}\``,
        footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL({ dynamic: true, size: 4096 }) }
      }});

      let embed = new MessageEmbed()
      .setColor(this.client.util.color.primary)
      .setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, size: 4096 }))
      .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setDescription(`> Name: ${this.client.util.toProperCase(cmd.name)}\n> Description: ${cmd.description}\n> Category: ${cmd.category}`);
      if (cmd.aliases.length > 0) embed.addField(`Alias`, cmd.aliases.map(a => `\`${this.client.prefix}${a}\``).join(', '));
      if (cmd.usage.length > 0) embed.addField('Usage(s)', cmd.usage.map(u => `\`${this.client.prefix}${cmd.name} ${u}\``).join('\n'));

      return this.client.send(msg.channel.id, { embed: embed.toJSON() });
    }
    
    let categories = this.client.commands.map(c => c.category).filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    });
      
    let embed = new MessageEmbed()
    .setAuthor(`Help Menu`, this.client.util.assets.clientPicture)
    .setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
    .setDescription(`Hey! A discord bot which does something`)
    .setFooter(`Total Commands ${this.client.commands.size}`)
    .setColor(this.client.util.color.primary);
      
    for (const category of categories) embed.addField(`${category} [${this.client.commands.filter(c => c.category === category).size}]`, this.client.commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(', '))
      
    return this.client.send(msg.channel.id, { embed: embed.toJSON() });
  }
};