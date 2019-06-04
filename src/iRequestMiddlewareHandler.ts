import {Request, Response, NextFunction} from 'express';


export interface IRequestMiddlewareHandler{
    handle(request: Request, response: Response, next: NextFunction): void;
}