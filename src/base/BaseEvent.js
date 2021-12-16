export class BaseEvent {
    constructor(client, name) {
        this.client = client;
        this.name = name;
    }

    execute(...args) {}
}