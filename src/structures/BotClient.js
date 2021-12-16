import { Client } from "discord.js";
import config from "../../config";

export class BotClient extends Client {
    constructor(options) {
        super(options);

        this.config = config;
    }

    async build() {
        await this.login(this.config.token);
    }
}