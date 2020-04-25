import MarkdownIt from "markdown-it";
import { MarkdownDataStore } from "../models/MarkdownDataStore";
import { IMarkdownItStrategy } from "../../markdownIt/IMarkdownItStrategy";

export class BogImageRenderStrategy implements IMarkdownItStrategy{

    attach(markdownIt:MarkdownIt, bogDataStore:MarkdownDataStore): void {
        let defaultImageRule = markdownIt.renderer.rules.image;

        markdownIt.renderer.rules.image = function(tokens, idx, options, env, self){
            let token = tokens[idx];
            
            return defaultImageRule(tokens, idx, options, env, self);
        };
    }

}