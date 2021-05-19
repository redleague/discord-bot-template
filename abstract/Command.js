module.exports = class AbstractCommand {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
    this.aliases = options.aliases || [];
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'General';
    this.usage = options.usage || [];
    this.userPerms = options.userPerms || ["SEND_MESSAGES"];
    this.clientPerms = options.botPerms || ['SEND_MESSAGES'];
    this.ownerOnly = options.ownerOnly || false;
  }
  
  async run(msg, run) {
    throw new Error(`Command ${this.name} doesn't provide a run method!`);
  }
};