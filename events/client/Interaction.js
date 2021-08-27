const AbstractEvent = require('../../abstract/Event');

class Interaction extends AbstractEvent {
  constructor(client) {
    super(client, { name: "interactionCreate" });
  }

  async run(interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;
    if (interaction?.user?.bot) return;

    interaction.restTimestamp = Date.now();

    const { commandName } = interaction;

    const command = this.client.getInteraction(commandName);

    if (command) {
      try {
        await command.run({ interaction });
      } catch(e) {
        this.client.logger.error(e)
      }
    }
  }
}

module.exports = Interaction;
