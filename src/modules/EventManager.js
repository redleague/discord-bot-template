import { promises as fs } from "fs";
import { parse, resolve } from "path";
import { CustomError } from "../utils/CustomError";

export class EventsLoader {
    constructor(client, emitter, path) {
        this.client = client;
        this.emitter = emitter;
        this.path = path;
    }

    async load() {
        fs.readdir(resolve(this.path))
            .then(async events => {
                events = events.filter(x => x.endsWith(".js"));
                for (const file of events) {
                    const event = await this.import(resolve(this.path, file), this.client);
                    if (event === undefined) throw new Error(`EVENT: ${file} is not a valid event file`);
                    this.emitter.on(event.name, (...args) => event.execute(...args));
                }
            })
            .catch(err => console.error(CustomError("EVENTS_LOADER_ERR:", err)));
    }

    async import(path, ...args) {
        const file = (await import(resolve(path)).then(m => m[parse(path).name]));
        return file ? new file(...args) : undefined;
    }
}