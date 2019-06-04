import express = require("express");
import { RouteBuilder } from "./routeBuilder";
import {Express} from 'express';

export class ExpressServerFactory {
    public build(config: any | null): any {
        let app: Express = express();
        let port = (config && config.port) ? config.port : 3000;
        RouteBuilder.configure(app);
        return app;
    }
}
