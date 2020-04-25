import MarkdownIt from "markdown-it";
import { MarkdownDataStore } from "../domain/models/MarkdownDataStore";
import { IMarkdownItStrategy } from "./IMarkdownItStrategy";

export class MarkdownItRulesFactory{
    constructor(private ruleStrategies:IMarkdownItStrategy[]) {
    }

    public build(markdownIt:MarkdownIt, bogDataStore:MarkdownDataStore):void{
        this.ruleStrategies.forEach(strategy => {
            strategy.attach(markdownIt, bogDataStore);
        });
    }
    
}

