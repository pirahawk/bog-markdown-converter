export class HrefLinkClassParsingStrategy{
    public static tryParseHrefLink(mdHrefLink:string): HrefLinkParseModel | null {
        const parseSplitToken = "$>";
        const classSplitToken = "|";

        if(!mdHrefLink){
            return null;
        }

        mdHrefLink = decodeURI(mdHrefLink);

        let parseModel:HrefLinkParseModel = {
            link: null,
            classAttributes: null
        };

        let parseSplit = mdHrefLink.split(parseSplitToken)
        
        if(parseSplit[0]){
            parseModel.link = parseSplit[0] as string;
        }

        if(parseSplit[1]){
            parseModel.classAttributes = parseSplit[1].split(classSplitToken);
        }
        
        return parseModel;
    }
}

export interface HrefLinkParseModel{
    link:string | null;
    classAttributes: string[] | null
}