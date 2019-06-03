import express = require("express");
import { MarkdownRequestHandler, IHttpRouteHandler } from "./routing";

export class Bootstrapper {
    
    private readonly configOptions: any = {
        port: 3000
    };

    public run(): void {
        let serverFactory = new ExpressServerFactory();
        let app = serverFactory.build(this.configOptions);
        this.start(app);
    }

    private start(app:any):void{
        app.listen(this.configOptions, () => console.log(`Example app listening on port ${this.configOptions.port}!`));
    }
}

class ExpressServerFactory {

    public build(config: any | null): any {
        let app = express();
        let port = (config && config.port) ? config.port : 3000;
        RouteBuilder.configure(app);
        return app;
    }
}

class RouteBuilder {
    static configure(app: any): void {
        let helper:RouteHelper = new RouteHelper(app);
        helper.mapGet("/", new MarkdownRequestHandler());
    }
}

class RouteHelper {
    
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