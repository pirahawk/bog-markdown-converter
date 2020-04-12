import MarkdownIt from "markdown-it";
import { request } from "express";
export class MarkdownBase {
    constructor(private markdownIt: MarkdownIt) { }

    render(requestContent: string): string {
        var renderedContent = this.markdownIt.render(requestContent);
        return renderedContent;
    }
}
