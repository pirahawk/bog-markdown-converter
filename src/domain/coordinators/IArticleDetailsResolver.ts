import { Observable } from "rxjs";

export interface IArticleDetailsResolver {
    resolveArticleData(articleId:string, dataStore:any): Observable<any>
}
