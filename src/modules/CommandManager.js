/* eslint-disable no-undef */
import { promises as fs } from "fs";
import { parse, resolve } from "path";
import { Collection } from "discord.js";
import { CustomError } from "../utils/CustomError.js";
import { pathToFileURL } from "url";

export class CommandManager extends Collection {
    constructor(client, path) {
        super();
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
                            const allCmd = await this.client.application.commands.fetch().catch(() => this.client.logger.info(new CustomError("GLOBAL_SLASH_FETCH", "An error occured while fetching slash comamnds")));
                            for (const file of files) {
                                const path = resolve(this.path, category, file);
                                const command = await this.import(path, this.client, { category, path });
                                if (command === undefined) throw new Error(`Command: ${file} is not a valid command`);
                                command.meta = Object.assign(command.meta, { path, category });
                                this.set(command.meta.slash.name, command);
                                if (!allCmd.find(c => c.name !== command.meta.slash.name)) {
                                    if (this.client.config.isDev) {
                                        for (const devGuild of this.client.config.devGuilds) {
                                            const guild = await this.client.guilds.fetch(devGuild);
                                            await guild.commands.create(command.meta.slash)
                                                .catch(() => this.client.logger.info(`Missing access on ${guild} [SLASH_COMMAND]`));
                                        }
                                    } else {
                                        await this.client.application.commands.create(command.meta.slash).catch(() => this.client.logger.log(new CustomError("GLOBAL_SLASH_REGISTER", "Error in registering global slash")));
                                    }
                                }
                            }
                            return { files };
                        })
                        .catch(err => this.client.logger.error(CustomError("CMD_LOADER_ERR:", err)))
                        .finally(() => this.client.logger.info(`Done registering ${category} category.`));
                }
            })
            .catch(err => this.client.logger.error(CustomError("CATEGORY_LOADER_ERR:", err)))
            .finally(() => {
                this.client.logger.info("All categories has been registered.");
                this.isReady = true;
            });
    }

    /**
     * @private
     */
    async import(path, ...args) {
        const file = (await import(pathToFileURL(path)).then(m => m[parse(path).name]));
        return file ? new file(...args) : undefined;
    }
}
