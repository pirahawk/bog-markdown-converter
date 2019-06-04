import { IRequestMiddlewareHandler } from "../iRequestMiddlewareHandler";
import { Request, Response, NextFunction } from "express";

export class RequestBodyExtractor implements IRequestMiddlewareHandler {

    handle(request: Request, response: Response, next: NextFunction): void {
        var data =  '';

        if(!request.headers['content-type']){
            request.body = data;
            next();
            return;
        }

        request.setEncoding('utf8');
        request.on('data', function (chunk) {
            data += chunk;
        });

        request.on('end', function () {
            request.body = data;
            next();
        });
    }
}