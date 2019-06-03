import { IHttpRouteHandler } from "./iHttpRouteHandler";
export class MarkdownRequestHandler implements IHttpRouteHandler {
    handle(request: any, response: any): void {
        response.send('hello');
    }
}
