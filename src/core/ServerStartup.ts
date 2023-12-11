import { ServerConfiguration } from "./ServerConfiguration";
import * as express from "express";
import * as bodyParser from "body-parser";
import { RouteBuilder } from "./RouteBuilder";
import { PingRouteHandler } from "../handlers/PingRouteHandler";
import { MarkdownFactory } from "../markdownIt/MarkdownFactory";
import { BogMarkdownOptions } from "../markdownIt/MarkdownOptions";
import { MarkdownConvertRouteHandler } from "../handlers/MarkdownConvertRouteHandler";
import { ResolveArticleDataCoordinator } from "../domain/coordinators/ResolveArticleDataCoordinator";
import { MarkdownItRulesFactory } from "../markdownIt/MarkdownItRulesFactory";
import { ImageRenderStrategy } from "../domain/renderStrategies/ImageRenderStrategy";
import { HrefLinkRenderStrategy } from "../domain/renderStrategies/HrefLinkRenderStrategy";
import { MdRulesPlayPen } from "../domain/renderStrategies/MdRulesPlayPen";

export class ServerStartup {
    private markdownItFactory?: MarkdownFactory;

    constructor(private configuration:ServerConfiguration, private bogMarkdownOptions: BogMarkdownOptions) {
    }

    public setup(expressApp: express.Application):void{
        expressApp.use(express.urlencoded({ extended: true }));
        expressApp.use(express.json());
        expressApp.use(express.text());

        let markdownRulesFactory = new MarkdownItRulesFactory([
            new ImageRenderStrategy(),
            new HrefLinkRenderStrategy(),
            new MdRulesPlayPen(),
        ]);
        this.markdownItFactory = new MarkdownFactory(this.bogMarkdownOptions, markdownRulesFactory, [
            new ResolveArticleDataCoordinator(this.bogMarkdownOptions)
        ]);
    }

    public configure(expressApp: express.Application, routeBuilder:RouteBuilder) {
       routeBuilder.get('/', expressApp, new PingRouteHandler());
       routeBuilder.get('/ping', expressApp, new PingRouteHandler());
       routeBuilder.post('/convert/:articleId([\\d\\w-]{36,38})', expressApp, new MarkdownConvertRouteHandler(this.markdownItFactory as MarkdownFactory));
    }
}

