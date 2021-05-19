module.exports = class AbstractEvent {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
    this.raw = options.raw || false;
    this.once = options.once || false
  }
  
  /* eslint-disable-next-line no-unused-vars */
  async run(...args) {
    
  }
}