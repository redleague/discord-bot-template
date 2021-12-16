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
    
}