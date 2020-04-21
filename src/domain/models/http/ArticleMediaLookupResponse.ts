import { Link } from "./Link";

export interface ArticleMediaLookupResponse{
    articleId:string;
    links: Link[];
}