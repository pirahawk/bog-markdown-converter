import express = require("express");
import { RouteBuilder } from "./routeBuilder";

export class ExpressServerFactory {
    public build(config: any | null): any {
        let app = express();
        let port = (config && config.port) ? config.port : 3000;
        RouteBuilder.configure(app);
        return app;
    }
}
