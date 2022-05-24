import { Client, ClientOptions } from "discord.js";
import { createLogger } from "../modules/Logger.js";
import { config } from "../config.js";

export class BotClient extends Client {
    public readonly logger = createLogger("Bot", "en-US", true);
    public readonly config = config;

    public constructor(options: ClientOptions) {
        super(options);
    }

    public build(): Promise<string> {
        return this.login(this.config.token);
    }
}

declare module "discord.js" {
    interface Client {
        logger: BotClient["logger"];
        config: BotClient["config"];

        // eslint-disable-next-line @typescript-eslint/method-signature-style
        build(): Promise<string>;
    }
}
