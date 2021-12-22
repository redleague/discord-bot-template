import { BaseCommand } from "../../base/BaseCommand.js";
import { makeEmbed } from "../../utils/makeEmbed.js";

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
        ctx.send({
            embeds: [
                makeEmbed("info", `\`\`\`REST Latency: ${Date.now() - ctx.guild.restTimestamp}ms\nWS Latency: ${this.client.ws.ping}\`\`\``).setThumbnail(this.client.user.avatarURL({ size: 4096 }))
            ]
        });
    }
}