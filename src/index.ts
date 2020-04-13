
//import * as express from "express";

import { ServerConfiguration } from "./core/ServerConfiguration";
import { ServerRunner } from "./core/ServerRunner";
import { BogMarkdownOptions } from "./markdownIt/MarkdownOptions";

let expressPort:number = parseInt(process.env.EXPRESS_PORT as string);
let bogApiHost:string = process.env.BOG_API_HOST as string;
let bogApiScheme:string = process.env.BOG_API_SCHEME as string;

let serverConfiguration:ServerConfiguration = {
    port: expressPort
};

let markdownOptions = new BogMarkdownOptions();
markdownOptions.bogApiScheme = bogApiScheme;
markdownOptions.bogApiHost = bogApiHost;

let serverRunner = new ServerRunner();
serverRunner.run(serverConfiguration, markdownOptions);