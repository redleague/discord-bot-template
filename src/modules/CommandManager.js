import { promises as fs } from "fs";
import { parse, resolve } from "path";
import { Collection } from "discord.js";
import { CustomError } from "../utils/CustomError";

export class CommandManager extends Collection {
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.cooldowns = new Collection();
    }

    load() {
        fs.readdir(resolve(this.path))
            .then(async categories => {
                for (const category of categories) {
                    await fs.readdir(resolve(this.path, category))
                    .then(async files => {
                        const allCmd = await this.client.application.commands.fetch();
                        for (const file of files) {
                            const path = resolve(this.path, category, file);
                            const command = await this.import()
                        }
                    });
                }
            });
    } 
}