import { IHttpRouteHandler } from "./iHttpRouteHandler";
import {Express, Request, Response} from 'express';

export class RouteHelper {
    
    constructor(private app: Express) { }
    
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
