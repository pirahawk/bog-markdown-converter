import { MarkdownRequestHandler } from "./markdownRequestHandler";
import { RouteHelper } from "./routeHelper";
export class RouteBuilder {
    static configure(app: any): void {
        let helper: RouteHelper = new RouteHelper(app);
        helper.mapGet("/", new MarkdownRequestHandler());
    }
}
