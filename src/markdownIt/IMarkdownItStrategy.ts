import MarkdownIt from "markdown-it";
import { MarkdownDataStore } from "../domain/models/MarkdownDataStore";
export interface IMarkdownItStrategy {
    attach(markdownIt: MarkdownIt, bogDataStore: MarkdownDataStore): void;
}
