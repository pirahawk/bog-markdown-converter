import * as express from "express";
import * as http from "http";

import { ServerConfiguration } from "./ServerConfiguration";
import { ServerStartup } from "./ServerStartup";

export class ServerRunner {
   
    private expressApp: express.Application;
    private nodeServer: http.Server;

    /**
     *
     */
    constructor() {
        this.expressApp = {} as unknown as express.Application;
        this.nodeServer = {} as unknown as http.Server;
    }

    public run(configuration: ServerConfiguration): void {
        if (!configuration) {
            return;
        }

        let express = require('express');
        this.expressApp = express();
        let startup = new ServerStartup(configuration);

        startup.setup(this.expressApp);
        startup.configure(this.expressApp);

        this.nodeServer = this.expressApp.listen(configuration, () => { 
            console.log(`Bog Markdown Converter started: listenting on port ${configuration.port}`) ; 
        });
    }
}
