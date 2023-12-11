import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import { IMarkdownItStrategy } from "../../markdownIt/IMarkdownItStrategy";
import { MarkdownDataStore } from "../models/MarkdownDataStore";


/*

The way you override the rules is by matching the name of the token you want to target.

For example for inline token sets defined by the parser see:
https://github.com/markdown-it/markdown-it/blob/064d602c6890715277978af810a903ab014efc73/lib/parser_inline.js

If say you want to target an <a/> hyperlink in the markdown then you have to create a rule that targets that type of token in the parse
such as 'link_open' or 'link_close' like so in the token parser in src here:
https://github.com/markdown-it/markdown-it/blob/064d602c6890715277978af810a903ab014efc73/lib/rules_inline/link.js#L134


if you wanted to target an image for example then, its like so:
note there is only one token for this named 'image'. This is why there is also the default rule in the render named 'image'
https://github.com/markdown-it/markdown-it/blob/064d602c6890715277978af810a903ab014efc73/lib/rules_inline/image.js#L139


Default rules API
https://markdown-it.github.io/markdown-it/#Renderer.prototype.rules

As said before, can extend rules to match a token type via the token name, for example

markdownIt.renderer.rules.link_open; --> will match tokens from the parse of type 'link_open' (i.e. standard <a/> link)

In your override can default back to the default renderer to render something if you don't have anything you can do like so:

markdownIt.renderer.rules.link_open = function(tokens, idx, options, env, self){
            return self.renderToken(tokens, idx, options); //default token render to html
        };

*/

export class MdRulesPlayPen implements IMarkdownItStrategy{
    attach(markdownIt: MarkdownIt, bogDataStore: MarkdownDataStore): void {

        return;

        //let defaultLinkOpen = markdownIt.renderer.rules.link_open;
        markdownIt.renderer.rules.link_open = function(tokens, idx, options, env, self){
            return self.renderToken(tokens, idx, options);
            //return defaultLinkOpen(tokens, idx, options, env, self);
        };

        // let defaultLinkClose = markdownIt.renderer.rules.link_close;
        markdownIt.renderer.rules.link_close = function(tokens, idx, options, env, self){
            return self.renderToken(tokens, idx, options);
        };
    }

}
