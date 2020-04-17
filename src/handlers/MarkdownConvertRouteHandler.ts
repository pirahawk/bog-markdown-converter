import { IBogRouteHandler } from "../core/IBogRouteHandler";
import * as express from "express";
import { MarkdownBase } from "../markdownIt/MarkdownBase";
import { MarkdownFactory } from "../markdownIt/MarkdownFactory";

export class MarkdownConvertRouteHandler implements IBogRouteHandler {
    constructor(private markdownFactory: MarkdownFactory) {}

    handle(request: express.Request, response: express.Response): void {
        if(!request.body || !request.params || !request.params.articleId){
            response.statusCode = 400;
            response.send();    
        }

        let articleId = request.params.articleId as string;
        let requestContent = request.body as string;
        
        this.markdownFactory.buildForArticle(articleId).then((markdownItBase)=>{

            let renderedContent = markdownItBase.render(requestContent);
            
            response.contentType('text/html');
            response.send(renderedContent);
        });
    }
}
