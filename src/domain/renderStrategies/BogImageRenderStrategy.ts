import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";

import { MarkdownDataStore } from "../models/MarkdownDataStore";
import { IMarkdownItStrategy } from "../../markdownIt/IMarkdownItStrategy";
import { HrefLinkClassParsingStrategy } from "./HrefLinkClassParsingStrategy";

export class BogImageRenderStrategy implements IMarkdownItStrategy{

    attach(markdownIt:MarkdownIt, bogDataStore:MarkdownDataStore): void {
        let defaultImageRule = markdownIt.renderer.rules.image;
        let that = this;

        markdownIt.renderer.rules.image = function(tokens, idx, options, env, self){
            let token = tokens[idx];
            let result = that.tryRenderToken(token, bogDataStore);

            if(result){
                return result;
            }

            return defaultImageRule(tokens, idx, options, env, self);
        };
    }

    tryRenderToken(token: Token, bogDataStore: MarkdownDataStore): string | void{
        if(!token || !token.attrs ){
            return;
        }

        console.log(token);
        let tokenAttributes = token.attrs as string[][];
        let sourceAttribute = tokenAttributes.find(tknAttr => tknAttr[0] === 'src');
        let sourceLinkRaw = (sourceAttribute as string[])[1];
        let linkParseModel = HrefLinkClassParsingStrategy.tryParseHrefLink(sourceLinkRaw);
        let sourceLink = linkParseModel?.link as string;
        let isWebLink = this.isWebLink(sourceLink);
        let mappedLink: string = sourceLink;
        let content:string = token.content;

        if(!isWebLink){
            mappedLink = this.tryResolveBogUri(sourceLink, bogDataStore);
        }

        return this.renderImageDom(isWebLink, mappedLink, content, linkParseModel?.classAttributes);
    }
    renderImageDom(isWebLink: boolean, mappedLink: string, content:string, customClassAttributes:string[]|undefined|null): string | void {
        let classList = [`bogMedia`];
        
        if(isWebLink){
            classList.push('external');
        }

        if(!mappedLink){
            classList.push('unmapped');
        }

        if(customClassAttributes){
            classList = classList.concat(customClassAttributes);
        }

        let imgClasses = classList.reduce((previous, current, index, arr)=>{
            if(!previous){
                return current;
            }

            return `${previous} ${current}`;
        });

        return `<img src="${mappedLink}" alt="${content}" class="${imgClasses}">`;
    }

    private isWebLink(uri:string):boolean{
        let isWebRegex = /^https{0,1}:\/\//;
        return isWebRegex.test(uri);
    }

    private tryResolveBogUri(imageFileName:string, bogDataStore: MarkdownDataStore): string{
        let bogUrl = bogDataStore.articleMediaLookupResponse.mediaLookup[`${imageFileName}`];
        
        if(!bogUrl){
            return '';
        }

        return this.decodeBase64(bogUrl);
    }

    private decodeBase64(base64Str:string){
        let buff = new Buffer(base64Str, 'base64');
        let text = buff.toString('ascii');
        return text;
    }
}