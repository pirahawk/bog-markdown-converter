import { ServerConfiguration } from "./ServerConfiguration";
import * as express from "express";
import * as bodyParser from "body-parser";

export class ServerStartup {
    
    constructor(private configuration:ServerConfiguration) {
    }

    public setup(expressApp: express.Application):void{
        expressApp.use(bodyParser.urlencoded());
        expressApp.use(bodyParser.json());
        expressApp.use(bodyParser.text());
    }

    public configure(expressApp: express.Application) {
        expressApp.get("/", (req, resp)=>{
            resp.status(204);
            resp.send();
        })

        expressApp.post("/", (req, resp)=>{
            let test = req.body;
            resp.status(204);
            resp.send();
        })
    }
}