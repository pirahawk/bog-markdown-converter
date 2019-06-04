import {Express} from 'express';
import { RouteHelper } from "./routeHelper";
import { MarkdownRequestHandler } from "./handlers/markdownRequestHandler";
import { NoContentHandler } from "./handlers/noContentHandler";
import { RequestBodyExtractor } from "./middleware/requestBodyExtractor";


export class RouteBuilder {
    static configure(app: Express): void {
        let helper: RouteHelper = new RouteHelper(app);

        this.mapMiddleware(helper);
        this.mapRequestHandlers(helper);
    }

    static mapMiddleware(helper: RouteHelper) {
        helper.map(new RequestBodyExtractor());
    }

    private static mapRequestHandlers(helper: RouteHelper) {
        helper.mapGet("/", new NoContentHandler());
        helper.mapPost("/", new MarkdownRequestHandler());
    }
}
