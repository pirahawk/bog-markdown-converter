import MarkdownIt from "markdown-it";
import { request } from "express";
export class MarkdownBase {
    constructor(private markdownIt: MarkdownIt) { }

    render(requestContent: string): string {
        let renderedContent = this.markdownIt.render(requestContent);
        return renderedContent;
    }
}
