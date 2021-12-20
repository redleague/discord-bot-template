import { BaseCommand } from "../../base/BaseCommand";

export class PingCommand extends BaseCommand {
    constructor(client) {
        super(client, {
            meta: {
                name: "ping",
                description: "gives the ping of the bot"
            }
        });
    }

    execute(ctx) {
        ctx.send(`My ping is ${this.client.ws.ping}`);
    }
}