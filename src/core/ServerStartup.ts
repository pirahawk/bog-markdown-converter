import { ServerConfiguration } from "./ServerConfiguration";
import * as express from "express";
import * as bodyParser from "body-parser";
import { RouteBuilder } from "./RouteBuilder";
import { PingRouteHandler } from "../handlers/PingRouteHandler";
import { MarkdownFactory } from "../markdownIt/MarkdownFactory";
import { MarkdownBase } from "../markdownIt/MarkdownBase";
import { MarkdownOptions } from "../markdownIt/MarkdownOptions";
import { MarkdownConvertRouteHandler } from "../handlers/MarkdownConvertRouteHandler";

export class ServerStartup {
    private markdownIt?: MarkdownBase;

    constructor(private configuration:ServerConfiguration, private markdownOptions: MarkdownOptions) {
    }

    public setup(expressApp: express.Application):void{
        expressApp.use(bodyParser.urlencoded());
        expressApp.use(bodyParser.json());
        expressApp.use(bodyParser.text());
        this.markdownIt = new MarkdownFactory().build(this.markdownOptions);
    }

    public configure(expressApp: express.Application, routeBuilder:RouteBuilder) {
       
       routeBuilder.get("/", expressApp, new PingRouteHandler());
       routeBuilder.post("/convert", expressApp, new MarkdownConvertRouteHandler(this.markdownIt as MarkdownBase));


        // expressApp.get("/", (req, resp)=>{
        //     resp.status(204);
        //     resp.send();
        // })

        // expressApp.post("/", (req, resp)=>{
        //     let test = req.body;
        //     resp.status(204);
        //     resp.send();
        // })
    }
}

