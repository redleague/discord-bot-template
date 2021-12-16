import pino from "pino";
import { resolve } from "path";

export function createLogger(name, lang, type, shardID, debug = false) {
    const dateFormat = Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour12: false
    });
    const date = formatDate(dateFormat);
    const logger = pino({
        formatters: {
            bindings: () => ({
                pid: type === "shard" ? shardID === undefined ? null : `Shard #${shardID}` : `ShardManager`
            })
        },
        level: debug ? "debug" : "info",
        name,
        timestamp: true,
        transport: {
            targets: [
                { target: "pino/file", level: "info", options: { destination: resolve(process.cwd(), "logs", `${name}-${date}.log`) } },
                { target: "pino-pretty", level: debug ? "debug" : "info", options: { translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l o" } }
            ]
        }
    });
    return logger;
}

function formatDate(dateFormat, date = new Date()) {
    const data = dateFormat.formatToParts(date);
    return `<year>-<month>-<day>`
        .replace(/<year>/g, data.find(d => d.type === "year").value)
        .replace(/<month>/g, data.find(d => d.type === "month").value)
        .replace(/<day>/g, data.find(d => d.type === "day").value);
}