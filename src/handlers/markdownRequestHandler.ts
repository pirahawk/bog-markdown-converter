import { IHttpRouteHandler } from "../iHttpRouteHandler";
import {Request, Response} from 'express';
import MarkdownIt = require("markdown-it");
import {Options, Rule} from 'markdown-it';

export class MarkdownRequestHandler implements IHttpRouteHandler {
    handle(request: Request, response: Response): void {
        if(!request.body){
            response.status(400).send();
            return;
        }

        let parser: MarkdownIt = new MarkdownIt();
        let renderedResponse = parser.render(request.body);

        response.send(renderedResponse);
    }
}
