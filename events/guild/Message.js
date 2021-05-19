const AbstractEvent = require('../../abstract/Event');
const { MessageEmbed } = require('discord.js');

module.exports = class MessageEvent extends AbstractEvent {
  constructor(client) {
    super(client, { name: 'message' });
  }
  async run (msg) {

    if (msg.channel.type === 'dm' || !msg.channel.viewable || msg.author.bot) return;
    if (msg.webhookID) return;
    
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;

    msg.eventTimestamp = Date.now();
    
    const mentionRegex = new RegExp(`^<@!?${this.client.user.id}>$`);
    const mentionRegexPrefix = new RegExp(`^<@!?${this.client.user.id}> `);


    if (msg.content.match(mentionRegex)) return msg.channel.send(`My prefix for this server is ${this.client.prefix}`);
    
    const prefix = msg.content.match(mentionRegexPrefix) ? msg.content.match(mentionRegexPrefix)[0] : this.client.prefix;

    if (!msg.content.startsWith(prefix)) return;
    const [cmdName, ...cmdArgs] = msg.content
    .slice(prefix.length)
    .trim()
    .split(/\s+/);
    
    const command = this.client.fetchCommand(cmdName);
    if(!command) return;

    try {
      command.run(msg, cmdArgs);
    } catch(e) {
      msg.channel.send({embed: {
        color: this.client.color.error,
        description: `${this.client.emoji.error} | Something went wrong!`
      }});
      
      this.client.logger.error(`Something went wrong: \n${e.stack}`)
    }
  }
}