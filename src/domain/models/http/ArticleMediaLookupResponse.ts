import { Link } from "./Link";

export interface ArticleMediaLookupResponse{
    articleId:string;
    mediaLookup:{ [name: string]: string };
    links: Link[];
}