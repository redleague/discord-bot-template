const Command = require("../../abstract/Command.js");

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Displays all the latenices",
      category: 'Utility',
      aliases: ["pong", "latency"],
      });
  }
  
  async run(msg) {
    let previousDate = Date.now();
    const m = await msg.channel.send('Pinging...');
    
    m.edit(` Latency: \`${Date.now () - msg.eventTimestamp}ms\`, REST Latency: \`${Date.now() - previousDate}ms\`, Gateway Latency: \`${Math.round(msg.guild.shard.ping)}ms\``);
  }
};