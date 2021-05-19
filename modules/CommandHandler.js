const BaseCommand = require('../abstract/Command.js');
const path = require('path');
const fs = require('fs').promises;

module.exports = class CommandHandler {
  constructor(client) {
    this.client = client;
  }
  
  async build(dir) {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (let file of files) {
      const stat = await fs.lstat(path.join(filePath, file));
      if (stat.isDirectory()) this.build(path.join(dir, file));
      if (file.endsWith('.js')) {
        const Command = require(path.join(filePath, file));
        if (Command.prototype instanceof BaseCommand) {
          const cmd = new Command(this.client);
          this.client.commands.set(cmd.name.toLowerCase(), cmd);
          for (let alias of cmd.aliases) this.client.aliases.set(alias, cmd.name.toLowerCase());
        }
      }
    }
  }
};