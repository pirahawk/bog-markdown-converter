import { ServerConfiguration } from "./ServerConfiguration";
import * as express from "express";
import * as bodyParser from "body-parser";
import { RouteBuilder } from "./RouteBuilder";
import { PingRouteHandler } from "../handlers/PingRouteHandler";
import { MarkdownFactory } from "../markdownIt/MarkdownFactory";
import { BogMarkdownOptions } from "../markdownIt/MarkdownOptions";
import { MarkdownConvertRouteHandler } from "../handlers/MarkdownConvertRouteHandler";
import { GetEntryDetailsCoordinator } from "../domain/coordinators/GetEntryDetailsCoordinator";

export class ServerStartup {
    private markdownItFactory?: MarkdownFactory;

    constructor(private configuration:ServerConfiguration, private bogMarkdownOptions: BogMarkdownOptions) {
    }

    public setup(expressApp: express.Application):void{
        expressApp.use(bodyParser.urlencoded());
        expressApp.use(bodyParser.json());
        expressApp.use(bodyParser.text());

        let getEntryDetailsCoordinator = new GetEntryDetailsCoordinator(this.bogMarkdownOptions);
        this.markdownItFactory = new MarkdownFactory(this.bogMarkdownOptions, [getEntryDetailsCoordinator]);
    }

    public configure(expressApp: express.Application, routeBuilder:RouteBuilder) {
       routeBuilder.get('/', expressApp, new PingRouteHandler());
       routeBuilder.post('/convert/:articleId([\\d\\w-]{36,38})', expressApp, new MarkdownConvertRouteHandler(this.markdownItFactory as MarkdownFactory));
    }
}

