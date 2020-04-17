import MarkdownIt from "markdown-it";
import { BogMarkdownOptions } from "./MarkdownOptions";
import { MarkdownBase } from "./MarkdownBase";
import { IArticleDetailsResolver } from "../domain/coordinators/IArticleDetailsResolver";
import { forkJoin} from 'rxjs';

export class MarkdownFactory{
    constructor(private markdownOptions:BogMarkdownOptions, private entryResolvers:IArticleDetailsResolver[]) {}

    public async buildForArticle(articleId:string):Promise<MarkdownBase>{

        let dataStore:any = {};
        await this.resolveArticleData(articleId, dataStore);

        let markdownIt = new MarkdownIt(this.markdownOptions);
        let markdown = new MarkdownBase(markdownIt);
        return markdown;
    }

    private resolveArticleData(articleId:string, dataStore:any):Promise<null>{
        return new Promise((resolve, reject)=>{
            let forkedObservable = forkJoin(this.entryResolvers.map(entryResolver => entryResolver.resolveArticleData(articleId, dataStore)));

            forkedObservable.subscribe(
                (completedObservables:any)=>{
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}