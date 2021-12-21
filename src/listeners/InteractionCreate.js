import { BaseEvent } from "../base/BaseEvent.js";
import { CommandContext } from "../structures/CommandContext.js";

export class InteractionCreate extends BaseEvent {
    constructor(client) {
        super(client, "interactionCreate");
    }

    async execute(interaction) {
        if (!interaction.inGuild()) return;
        if (interaction.isCommand()) {
            const cmd = this.client.commands.filter(c => c.meta.slash.name === interaction.commandName);
            if (cmd) {
                const context = new CommandContext(interaction);
                cmd.execute(context);
            }
        }
    }
}
