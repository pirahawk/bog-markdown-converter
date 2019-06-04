import { IHttpRouteHandler } from "./iHttpRouteHandler";
import {Request, Response} from 'express';

export class MarkdownRequestHandler implements IHttpRouteHandler {
    handle(request: Request, response: Response): void {
        response.send('hello');
    }
}

export class NoContentHandler implements IHttpRouteHandler{
    handle(request: Request, response: Response): void {
        response.status(204);
        response.send();
    }
}
