import { IHttpRouteHandler } from "./iHttpRouteHandler";
import {Express, Request, Response} from 'express';
import { IRequestMiddlewareHandler } from "./iRequestMiddlewareHandler";
import { NextFunction } from "connect";

export class RouteHelper {
    
    constructor(private app: Express) { }

    public map(handler:IRequestMiddlewareHandler): Express{
        if(!handler){
            throw Error('middleware handler cannot be null');
        }

        return this.app.use(function(request: Request, response: Response, next: NextFunction){
            handler.handle(request, response, next);
        });
    }
    
    public mapGet(routeTemplate: string, handler: IHttpRouteHandler): void {
        if (!routeTemplate || !handler) {
            throw Error('Route map arguments cannot be null');
        }

        this.app.get(routeTemplate, (request: Request, response: Response) => {
            handler.handle(request, response);
        });
    }

    public mapPost(routeTemplate:string, handler: IHttpRouteHandler):void{
        if (!routeTemplate || !handler) {
            throw Error('Route map arguments cannot be null');
        }

        this.app.post(routeTemplate, (request: Request, response: Response) => {
            handler.handle(request, response);
        });
    }
}
