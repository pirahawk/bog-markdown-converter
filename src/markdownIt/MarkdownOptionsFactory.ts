import { ServerConfiguration } from "../core/ServerConfiguration";
import { BogMarkdownOptions } from "./MarkdownOptions";

export class MarkdownOptionsFactory {
    private azKeyVaultName?: string;
    private expressPort?: number;
    private bogApiHost?: string;
    private bogApiScheme?: string;
    private bogApiKey?: string;

    constructor() {
        this.loadEnvironmentVariables();
    }

    private loadEnvironmentVariables() {
        this.expressPort = parseInt(process.env.EXPRESS_PORT as string);
        this.bogApiHost = process.env.BOG_API_HOST as string;
        this.bogApiScheme = process.env.BOG_API_SCHEME as string;
        this.bogApiKey = process.env.BOG_API_KEY as string;
        this.azKeyVaultName = process.env.AZ_KEY_VAULT as string;
    }

    public get serverConfiguration(): ServerConfiguration {
        return {
            port: this.expressPort ?? NaN
        };
    }

    public get bogMarkdownOptions(): BogMarkdownOptions {
        let markdownOptions = new BogMarkdownOptions();
        markdownOptions.bogApiScheme = this.bogApiScheme;
        markdownOptions.bogApiHost = this.bogApiHost;
        markdownOptions.bogApiKey = this.bogApiKey;

        return markdownOptions;
    }
}
