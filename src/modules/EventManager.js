import { promises as fs } from "fs";
import { parse, resolve } from "path";
import { pathToFileURL } from "url";
import { CustomError } from "../utils/CustomError.js";

export class EventManager {
    constructor(client, emitter, path) {
        this.client = client;
        this.emitter = emitter;
        this.path = path;
    }

    load() {
        fs.readdir(resolve(this.path))
            .then(async events => {
                events = events.filter(x => x.endsWith(".js"));
                for (const file of events) {
                    const event = await this.import(resolve(this.path, file), this.client);
                    if (event === undefined) throw new Error(`EVENT: ${file} is not a valid event file`);
                    this.emitter.on(event.name, (...args) => event.execute(...args));
                }
            })
            .catch(err => this.client.logger.error(CustomError("EVENTS_LOADER_ERR:", err)));
    }

    /**
     * @private
     */
    async import(path, ...args) {
        const file = (await import(pathToFileURL(path)).then(m => m[parse(path).name]));
        return file ? new file(...args) : undefined;
    }
}
