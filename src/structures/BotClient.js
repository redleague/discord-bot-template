import { Client } from "discord.js";
import { config } from "../../config";
import { createLogger } from "../modules/Logger";
import { CommandManager } from "../modules/CommandManager";
import { EventManager } from "../modules/EventManager";

export class BotClient extends Client {
    constructor(options) {
        super(options);

        this.config = config;
        this.logger = createLogger("main", "en-US", "shard", this.shard?.ids[0], this.config.isDev);
        this.commands = new CommandManager(this, resolve(__dirname, "..", "commands"));
        this.events = new EventManager(this, this, resolve(__dirname, "..", "events"));
    }

    async build() {
        this.events.load();
        this.on("ready", () => this.commands.load());
        await this.login(this.config.token);
        return this;
    }
}