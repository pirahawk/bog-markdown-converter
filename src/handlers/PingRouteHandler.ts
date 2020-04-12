import { IBogRouteHandler } from "../core/IBogRouteHandler";
import * as express from "express";


export class PingRouteHandler implements IBogRouteHandler{
    handle(request: express.Request, response: express.Response): void {
        response.statusCode = 204;
        response.send();
    }
}