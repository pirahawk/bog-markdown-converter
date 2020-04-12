
//import * as express from "express";

import { ServerConfiguration } from "./core/ServerConfiguration";
import { ServerRunner } from "./core/ServerRunner";
import { parse } from "querystring";

let expressPort:number = parseInt(process.env.EXPRESS_PORT as string);
let config:ServerConfiguration = {
    port: expressPort
};

let serverRunner = new ServerRunner();
serverRunner.run(config);
