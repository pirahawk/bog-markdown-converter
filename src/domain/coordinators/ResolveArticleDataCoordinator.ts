import { IArticleDetailsResolver } from "./IArticleDetailsResolver";
import { BogMarkdownOptions } from "../../markdownIt/MarkdownOptions";
import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from "rxjs";
import { ArticleResponse } from "../models/http/ArticleResponse";
import { LinkRelationValues } from "../values/LinkRelationValues";
import { ArticleMediaLookupResponse } from "../models/http/ArticleMediaLookupResponse";
import { MarkdownDataStore } from "../models/MarkdownDataStore";

export class ResolveArticleDataCoordinator implements IArticleDetailsResolver {
    constructor(private bogMarkdownOptions: BogMarkdownOptions) { }

    public resolveArticle(articleId: string, dataStore: MarkdownDataStore): Promise<ArticleMediaLookupResponse> {
        return new Promise((resolve, reject) => {
            let getArticleUrl: string = `${this.bogMarkdownOptions.bogApiUrl}/api/article/${articleId}`;
            let requestObservable: Observable<RxHttpRequestResponse<any>> = RxHR.get(getArticleUrl,{
                headers:{
                    "bog-api-k": this.bogMarkdownOptions.bogApiKey
                }
            });

            requestObservable.subscribe(
                response => this.handleGetArticleResponse(response, dataStore, getArticleUrl, resolve, reject),
                error => reject(new Error(`HTTP Fail - ${getArticleUrl}`))
            );
        });
    }

    handleGetArticleResponse(response: RxHttpRequestResponse<any>,
        dataStore: MarkdownDataStore,
        getArticleUrl: string,
        resolve: (value: ArticleMediaLookupResponse | PromiseLike<ArticleMediaLookupResponse>) => void,
        reject: (reason?: any) => void): void {

        if (response.response.statusCode >= 400 || !response.body) {
            reject(new Error(`HTTP Fail - ${response.response.statusCode}: ${getArticleUrl}`));
            return;
        }

        let articleResponse = JSON.parse(response.body) as ArticleResponse;
        dataStore.article = articleResponse;

        if (!articleResponse || !articleResponse.links.some(link => link.relation === LinkRelationValues.MEDIA_LOOKUP)) {
            reject(new Error(`No media-lookup available for: ${getArticleUrl}`));
            return;
        }

        let mediaLookupLink = articleResponse.links.find(link => link.relation === LinkRelationValues.MEDIA_LOOKUP);

        let getMediaLookupUrl: string = `${this.bogMarkdownOptions.bogApiUrl}${mediaLookupLink?.href}`;
        let requestObservable: Observable<RxHttpRequestResponse<any>> = RxHR.get(getMediaLookupUrl, {
            headers:{
                "bog-api-k": this.bogMarkdownOptions.bogApiKey
            }
        });

        requestObservable.subscribe(
            response => this.handleGetMediaLookupResponse(response, dataStore, getMediaLookupUrl, resolve, reject),
            error => reject(new Error(`HTTP Fail - ${getMediaLookupUrl}`))
        );
    }
    handleGetMediaLookupResponse(response: RxHttpRequestResponse<any>,
        dataStore: MarkdownDataStore,
        getMediaLookupUrl: string,
        resolve: (value: ArticleMediaLookupResponse | PromiseLike<ArticleMediaLookupResponse>) => void,
        reject: (reason?: any) => void): void {

        if (response.response.statusCode >= 400 || !response.body) {
            reject(new Error(`HTTP Fail - ${response.response.statusCode}: ${getMediaLookupUrl}`));
            return;
        }

        let articleMediaLookupResponse = JSON.parse(response.body) as ArticleMediaLookupResponse;
        dataStore.articleMediaLookupResponse = articleMediaLookupResponse;
        resolve(articleMediaLookupResponse);
    }
}