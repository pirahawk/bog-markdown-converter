import { IBogRouteHandler } from "../core/IBogRouteHandler";
import * as express from "express";
import { MarkdownBase } from "../markdownIt/MarkdownBase";
import { MarkdownFactory } from "../markdownIt/MarkdownFactory";

export class MarkdownConvertRouteHandler implements IBogRouteHandler {
    constructor(private markdownFactory: MarkdownFactory) {}

    handle(request: express.Request, response: express.Response): void {
        if(!request.body){
            response.statusCode = 400;
            response.send();    
        }

        let requestContent = request.body as string;
        let markdownItBase = this.markdownFactory.build();
        let renderedContent = markdownItBase.render(requestContent);
        
        response.contentType('text/html')
        response.send(renderedContent);
    }
}
