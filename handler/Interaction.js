const AbstractInteraction = require('../abstract/Interaction.js');
const path = require('path');
const fs = require('fs').promises;

class InteractionHandler {
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
        const Interaction = require(path.join(filePath, file));
        if (Interaction.prototype instanceof AbstractInteraction) {
          const cmd = new Interaction(this.client);
          this.client.cache.interactions.set(cmd.name.toLowerCase(), cmd);
        }
      }
    }
  }
};

module.exports = InteractionHandler;