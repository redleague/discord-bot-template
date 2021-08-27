class AbstractInteraction {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'General';
    this.usage = options.usage || [];
    this.options = options.options || null;
  }

  get interactionData() {
    return { name: this.name, description: this.description, options: this.options }
  }

  async run(...args) {
  }
}

module.exports = AbstractInteraction;