import * as express from "express";
import { IBogRouteHandler } from "./IBogRouteHandler";

export class RouteBuilder {
    public get(routeTemplate: string | RegExp, expressApp: express.Application, handler: IBogRouteHandler): void {
        if (!expressApp) {
            throw new Error("expressApp is null");
        }

        this.mapRoute(expressApp.get, expressApp, routeTemplate, handler);
    }

    public post(routeTemplate: string | RegExp, expressApp: express.Application, handler: IBogRouteHandler): void {
        if (!expressApp) {
            throw new Error("expressApp is null");
        }
        
        this.mapRoute(expressApp.post, expressApp, routeTemplate, handler);
    }

    private mapRoute(
        appFunction: (template: string | RegExp, handlerFunction: (request: express.Request, response: express.Response) => void) => void, 
        expressApp: express.Application,
        routeTemplate: string | RegExp, 
        handler: IBogRouteHandler): void {

        if (!routeTemplate) {
            throw new Error("routeTemplate is null");
        }
        if (!handler) {
            throw new Error("handler is null");
        }

        appFunction.call(expressApp, routeTemplate, (request, response) => handler.handle(request, response));
    }
}
