export interface IHttpRouteHandler{
    handle(request:any, response: any):void;
}

export class MarkdownRequestHandler implements IHttpRouteHandler {
    handle(request: any, response: any): void {
        response.send('hello');
    }
}