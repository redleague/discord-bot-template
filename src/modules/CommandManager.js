import { promises as fs } from "fs";
import { parse, resolve } from "path";
import { Collection } from "discord.js";
import { CustomError } from "../utils/CustomError";

export class CommandManager extends Collection {
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.isReady = false;
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
                            const command = await this.import(path, this.client, { category, path });
                            if (command === undefined) throw new Error(`Command: ${file} is not a valid command`);
                            command.meta = Object.assign(command.meta, { path, category });
                            this.set(command.meta.name, command);
                            if (!allCmd.find(c => c.name !== command.meta.name)) {
                                command.meta.slash = Object.assign(command.meta.slash, { name: command.meta.name, description: command.meta.description });
                                if (this.client.config.isDev) {
                                    for (const devGuild of this.client.config.devGuilds) {
                                        const guild = await this.client.guilds.fetch({ guild });
                                        await g.commands.create(command.meta.slash)
                                        .catch(() => this.client.logger.info(`Missing access on ${guild} [SLASH_COMMAND]`));
                                    }
                                } else {
                                    await this.client.application.commands.create(command.meta.slash)
                                }
                            }
                        }
                        return { files };
                    })
                    .catch(err => this.client.logger.error(CustomError("CMD_LOADER_ERR:", err)))
                    .finally(() => this.client.logger.info(`Done registering ${category} category.`));
                }
            })
            .catch(err => this.client.logger.error(CustomError("CMD_LOADER_ERR:", err)))
            .finally(() => {
                this.client.logger.info("All categories has been registered.");
                this.isReady = true;
            });
    }
    
    /**
     * @private
     */
    async import(path, ...args) {
        const file = (await import(resolve(path)).then(m => m[parse(path).name]));
        return file ? new file(...args) : undefined;
    }
}