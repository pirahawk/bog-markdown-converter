import { IHttpRouteHandler } from "./iHttpRouteHandler";
export class RouteHelper {
    constructor(private app: any) { }
    public mapGet(routeTemplate: string, handler: IHttpRouteHandler): void {
        if (!routeTemplate || !handler) {
            throw Error('Route map arguments cannot be null');
        }
        this.app.get(routeTemplate, (request: any, response: any) => {
            handler.handle(request, response);
        });
    }
}
