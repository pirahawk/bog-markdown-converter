import MarkdownIt from "markdown-it";
import { MarkdownOptions } from "./MarkdownOptions";
import { MarkdownBase } from "./MarkdownBase";

export class MarkdownFactory{
    build(markdownOptions: MarkdownOptions):MarkdownBase{
        let markdownIt = new MarkdownIt(markdownOptions)
        let markdown = new MarkdownBase(markdownIt);
        return markdown;
    }
}
