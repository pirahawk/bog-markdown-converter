import { RouteHelper } from "./routeHelper";
import { MarkdownRequestHandler, NoContentHandler } from "./markdownRequestHandler";
import {Express} from 'express';


export class RouteBuilder {
    static configure(app: Express): void {
        let helper: RouteHelper = new RouteHelper(app);

        helper.mapGet("/", new NoContentHandler());
        helper.mapPost("/", new MarkdownRequestHandler());
    }
}
