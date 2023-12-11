import { stringify, v4 as uuidv4 } from 'uuid';
import Token from "markdown-it/lib/token";

export class TwitterLinkRender{
    static twitterUrlRegex:RegExp = /^http[s]?\:\/{2}[\w\d]*[.]?twitter\.com/;

    public static canRender(tokens: Token[]): any{
        return this.tryFindMatchToken(tokens);
    }

    public static render(tokens: Token[]):string{
        let token = this.tryFindMatchToken(tokens);
        let attr = this.tryFindMatchAttribute(token?.attrs || [[]]);
        
        if(!attr){
            throw new Error('could not resolve twitter href link');
        }
        
        return this.twitterOutputTemplate(attr);
    }

    private static tryFindMatchToken(tokens: Token[]): Token | undefined{
        return tokens.find(token =>{
            return token.type === 'link_open' && token.attrs?.length && this.tryFindMatchAttribute(token.attrs);
            //&& token.attrs
            //&& token.attrs[0].find(attr => this.twitterUrlRegex.test(attr));
        });
    }

    private static tryFindMatchAttribute(attrs: string[][]): string | undefined{
        return attrs[0].find(attr => this.twitterUrlRegex.test(attr));
    }

    private static twitterOutputTemplate(tweetUrl:string):string{
        let tweetUrlEncoded = encodeURI(tweetUrl);
        let rawGuid:String =  new String(`${uuidv4()}`); 
        let replaceRegex = /-/g;
        let tweetPlaceHolderGuid = rawGuid.replace(replaceRegex, "");
        let loadFuncName = `load${tweetPlaceHolderGuid}`;
        let reqListenerFuncName = `reqListener${tweetPlaceHolderGuid}`;
        let tweetTemplate = `<iframe id="${tweetPlaceHolderGuid}" src="/api/twitterEmbed/${tweetPlaceHolderGuid}?tweetUrl=${tweetUrlEncoded}"></iframe>`;
        return tweetTemplate
    }
}


/*

 let tweetTemplate = `
        <script>
        function ${reqListenerFuncName} () {
            let divElement = document.getElementById('${tweetPlaceHolderGuid}');
            let responseTxt = this.responseText;
            let tweetResponse = JSON.parse(responseTxt);
            console.log(tweetResponse);
            if(!divElement){
                return;
            }
            divElement.innerHTML = tweetResponse.html;
        }

        function ${loadFuncName}(){
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", ${reqListenerFuncName});
            //oReq.responseType = "json";

            oReq.open("GET", "/api/twitterEmbed?tweetUrl=${tweetUrlEncoded}");
            oReq.setRequestHeader('Access-Control-Allow-Origin','https://publish.twitter.com');
            oReq.setRequestHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
            oReq.send();
        }
        </script>

        <div id="${tweetPlaceHolderGuid}" onload="setTimeout(function(){ ${loadFuncName}();}, 0)">
            <a href="${tweetUrl}" class="twitter"/>twitter</a>
        </div>
        `;


*/
