export class Base64StringHelper{
    public static FromBase64(encodedContent:string): string{
        if(!encodedContent){
            return encodedContent;
        }

        return Buffer.from(encodedContent, 'base64').toString();
    }
}