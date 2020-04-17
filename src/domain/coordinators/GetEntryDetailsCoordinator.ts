import { IArticleDetailsResolver } from "./IArticleDetailsResolver";
import { BogMarkdownOptions } from "../../markdownIt/MarkdownOptions";
import {RxHR, RxHttpRequestResponse} from '@akanass/rx-http-request';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";


export class GetEntryDetailsCoordinator implements IArticleDetailsResolver {
    constructor(private bogMarkdownOptions: BogMarkdownOptions) {}

    resolveArticleData(articleId:string, dataStore:any): Observable<any> {
        let getArticleUrl: string = `${this.bogMarkdownOptions.bogApiUrl}/api/article/${articleId}`;
        let requestObservable:Observable<RxHttpRequestResponse<any>> = RxHR.get(getArticleUrl);

        return requestObservable.pipe(map(response =>{
            let returnObservable = of(response);

            if(response.response.statusCode >=400 
                || !response.body){
                return returnObservable;
            }

            dataStore.article = response.body;
            return returnObservable;
        } ));
    }
}