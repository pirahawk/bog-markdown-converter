import MarkdownIt from "markdown-it";
import { IMarkdownItStrategy } from "../../markdownIt/IMarkdownItStrategy";
import { MarkdownDataStore } from "../models/MarkdownDataStore";
import { TwitterLinkRender } from "./TwitterLinkRender";

export class HrefLinkRenderStrategy implements IMarkdownItStrategy{
    attach(markdownIt: MarkdownIt, bogDataStore: MarkdownDataStore): void {
        markdownIt.renderer.rules.link_open = function(tokens, idx, options, env, self){
            if(TwitterLinkRender.canRender(tokens)){
                return TwitterLinkRender.render(tokens);
            }
            return self.renderToken(tokens, idx, options);
            //return defaultLinkOpen(tokens, idx, options, env, self);
        };
    }

}