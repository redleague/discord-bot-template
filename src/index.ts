import "dotenv/config";
import { Partials } from "discord.js";
import { BotClient } from "./structures/BotClient.js";

const client = new BotClient({
    intents: [
        "Guilds",
        "GuildMessages"
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember]
});

void client.build();
