export class BaseCommand {
    constructor(client, meta) {
        this.client = client;
        this.meta = meta;
    }

    execute(ctx, ...args) {}
}