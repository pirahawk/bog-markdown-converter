import {Request, Response} from 'express';

export interface IHttpRouteHandler {
    handle(request: Request, response: Response): void;
}
