import MarkdownIt from "markdown-it";
import { BogMarkdownOptions } from "./MarkdownOptions";
import { MarkdownBase } from "./MarkdownBase";

export class MarkdownFactory{
    private get bogApiHostUrl():string{
        let url = `${this.markdownOptions.bogApiScheme}://${this.markdownOptions.bogApiHost}`;
        return url;
    }

    constructor(private markdownOptions:BogMarkdownOptions) {}

    public build():MarkdownBase{
        let markdownIt = new MarkdownIt(this.markdownOptions);
        let markdown = new MarkdownBase(markdownIt);
        return markdown;
    }
}
