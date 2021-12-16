export class CommandContext {
    constructor(interaction) {
        this.context = interaction;
    }

    get client() {
        return this.context.guild.client;
    }

    get channel() {
        return this.context.channel;
    }

    get author() {
        return this.context.user;
    }

    get guild() {
        return this.context.guild;
    }

    send(options) {
        return this.context.editReply(options)
    }
}