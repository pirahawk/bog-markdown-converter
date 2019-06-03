import { RouteHelper } from "./routeHelper";
import { MarkdownRequestHandler, NoContentHandler } from "./markdownRequestHandler";

export class RouteBuilder {
    static configure(app: any): void {
        let helper: RouteHelper = new RouteHelper(app);

        helper.mapGet("/", new NoContentHandler());
        helper.mapPost("/", new MarkdownRequestHandler());
    }
}
