import { ArticleResponse } from "./http/ArticleResponse";
import { ArticleMediaLookupResponse } from "./http/ArticleMediaLookupResponse";

export interface MarkdownDataStore{
    article: ArticleResponse;
    articleMediaLookupResponse: ArticleMediaLookupResponse;
}