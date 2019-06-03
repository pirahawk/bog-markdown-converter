import routeHandler = require("./routeHandlers/iRouteHandler");

export class RouteBuilder {
    static configure(app: any): void {
        let routeHelper = new RouteHelper(app);
        routeHelper.mapGet("/", new routeHandler.MarkdownRequestHandler());
    }
}


export class RouteHelper{
    constructor(private app:any) {}

    public  mapGet(routeTemplate:string, handler: routeHandler.IHttpRouteHandler): void {
        if(!routeTemplate || !handler ){
            throw Error('Route map arguments cannot be null');
        }

        this.app.get(routeTemplate, (request:any, response:any)=>{
            handler.handle(request, response);
        });
    }
}