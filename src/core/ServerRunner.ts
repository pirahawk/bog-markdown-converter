import * as express from "express";
import * as http from "http";

import { ServerConfiguration } from "./ServerConfiguration";
import { ServerStartup } from "./ServerStartup";
import { RouteBuilder } from "./RouteBuilder";
import { BogMarkdownOptions } from "../markdownIt/MarkdownOptions";

export class ServerRunner {
   
    private expressApp: express.Application;
    private nodeServer: http.Server;

    constructor() {
        this.expressApp = {} as unknown as express.Application;
        this.nodeServer = {} as unknown as http.Server;
    }

    public run(configuration: ServerConfiguration, markdownOptions: BogMarkdownOptions): void {
        if (!configuration) {
            return;
        }

        let express = require('express');
        this.expressApp = express();
        let startup = new ServerStartup(configuration, markdownOptions);
        let routebuilder = new RouteBuilder();

        startup.setup(this.expressApp);
        startup.configure(this.expressApp, routebuilder);

        this.nodeServer = this.expressApp.listen(configuration, () => { 
            console.log(`Bog Markdown Converter started: listenting on port ${configuration.port}`) ; 
        });
    }
}
