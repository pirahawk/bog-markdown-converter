import { MarkdownDataStore } from "../models/MarkdownDataStore";

export interface IArticleDetailsResolver {
    resolveArticle(articleId:string, dataStore:MarkdownDataStore): Promise<any>;
}
