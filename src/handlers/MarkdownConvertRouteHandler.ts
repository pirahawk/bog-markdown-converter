import { IBogRouteHandler } from "../core/IBogRouteHandler";
import * as express from "express";
import { MarkdownBase } from "../markdownIt/MarkdownBase";

export class MarkdownConvertRouteHandler implements IBogRouteHandler {
    constructor(private markdownIt: MarkdownBase) {}

    handle(request: express.Request, response: express.Response): void {
        if(!request.body){
            response.statusCode = 400;
            response.send();    
        }

        let requestContent = request.body as string;
        let renderedContent = this.markdownIt.render(requestContent);
        
        response.contentType('text/html')
        response.send(renderedContent);
    }
}
