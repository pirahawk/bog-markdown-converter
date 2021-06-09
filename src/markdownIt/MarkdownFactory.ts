import MarkdownIt from "markdown-it";
import { BogMarkdownOptions } from "./MarkdownOptions";
import { MarkdownBase } from "./MarkdownBase";
import { IArticleDetailsResolver } from "../domain/coordinators/IArticleDetailsResolver";
import { MarkdownDataStore } from "../domain/models/MarkdownDataStore";
import { MarkdownItRulesFactory } from "./MarkdownItRulesFactory";

export class MarkdownFactory{
    constructor(private markdownOptions:BogMarkdownOptions, 
        private markdownRulesFactory:MarkdownItRulesFactory, 
        private entryResolvers:IArticleDetailsResolver[]) {}

    public async buildForArticle(articleId:string):Promise<MarkdownBase>{
        let dataStore:MarkdownDataStore = {} as MarkdownDataStore;

        try{
            await this.resolveArticleData(articleId, dataStore);
        }catch(error){
            return new Promise((resolve, reject)=>{
                reject(error);
            });
        }

        let markdownIt = new MarkdownIt(this.markdownOptions);
        this.markdownRulesFactory.build(markdownIt, dataStore);
        let markdown = new MarkdownBase(markdownIt);
        return markdown;
    }

    public async resolveArticleData(articleId:string, dataStore:MarkdownDataStore):Promise<null>{
        
        for(let i = 0; i < this.entryResolvers.length; i++){
            try{
                await this.entryResolvers[i].resolveArticle(articleId, dataStore);
            }catch(error){
                return new Promise((resolve, reject)=>{
                    reject(error);
                });
            }
        }

        return new Promise((resolve, reject)=>{
            resolve(null);
        });
    }
}