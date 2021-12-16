import { Client } from "discord.js";
import { config } from "../../config";
import { createLogger } from "../modules/Logger";

export class BotClient extends Client {
    constructor(options) {
        super(options);

        this.config = config;
        this.logger = createLogger;
    }

    async build() {
        await this.login(this.config.token);
    }
}