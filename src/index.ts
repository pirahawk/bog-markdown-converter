
//import * as express from "express";

import { ServerConfiguration } from "./core/ServerConfiguration";
import { ServerRunner } from "./core/ServerRunner";
import { MarkdownOptions } from "./markdownIt/MarkdownOptions";

let expressPort:number = parseInt(process.env.EXPRESS_PORT as string);
let serverConfiguration:ServerConfiguration = {
    port: expressPort
};

let markdownOptions = new MarkdownOptions();

let serverRunner = new ServerRunner();
serverRunner.run(serverConfiguration, markdownOptions);
