import { BaseCommand } from "../../base/BaseCommand.js";

export class PingCommand extends BaseCommand {
    constructor(client) {
        super(client, {
            slash: {
                name: "ping",
                description: "gives the ping of the bot"
            }
        });
    }

    async execute(ctx) {
        ctx.send(`My ping is ${this.client.ws.ping}`);
    }
}
