import { IBogRouteHandler } from "../core/IBogRouteHandler";
import * as express from "express";
import { MarkdownFactory } from "../markdownIt/MarkdownFactory";
import { MarkdownConverterRequest } from "../domain/models/http/MarkdownConverterRequest";
import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from "rxjs";
import { Base64StringHelper } from "../common/Base64StringHelper";

export class MarkdownConvertRouteHandler implements IBogRouteHandler {
    constructor(private markdownFactory: MarkdownFactory) { }

    handle(request: express.Request, response: express.Response): void {
        if (!request.body || !request.params || !request.params.articleId) {
            response.statusCode = 400;
            response.send();
            return;
        }

        let articleId = request.params.articleId as string;
        let mdRequest = request.body as MarkdownConverterRequest;

        if (!mdRequest.Content) {
            response.statusCode = 400;
            response.send();
            return;
        }

        let requestContentUrl: string = Base64StringHelper.FromBase64(mdRequest.Content);
        let requestObservable: Observable<RxHttpRequestResponse<string>> = RxHR.get(requestContentUrl);
        let convertFn = this.convertMdContent(request, response, articleId);

        requestObservable.subscribe(
            mdContent => convertFn(mdContent.body),
            error => {
                response.statusCode = 500;
                response.send();
            }
        );
    }

    private convertMdContent(request: express.Request, response: express.Response, articleId: string): (mdContent:string) => void {
        let mdFactory = this.markdownFactory;

        return (function (mdContent64:string) {
            mdFactory.buildForArticle(articleId)
                .then((markdownItBase) => {
                    let mdContent = Base64StringHelper.FromBase64(mdContent64);
                    let renderedContent = markdownItBase.render(mdContent);
                    response.contentType('text/html');
                    response.send(renderedContent);
                })
                .catch((error) => {
                    response.statusCode = 500;
                    response.send();
                });
        }).bind(this);
    }
}
