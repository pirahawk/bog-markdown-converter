import * as markdownIt from "markdown-it";

export class BogMarkdownOptions implements markdownIt.Options {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    typographer?: boolean;
    quotes?: string;
    highlight?: (str: string, lang: string) => void;
    bogApiHost?: string;
    bogApiScheme?: string;
    bogApiKey?: string;

    get bogApiUrl():string{
        return `${this.bogApiScheme}://${this.bogApiHost}`;
    }
}


