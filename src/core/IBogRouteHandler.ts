import * as express from "express";

export interface IBogRouteHandler {
    handle(request:express.Request, response:express.Response): void;
}

