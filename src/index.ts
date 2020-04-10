
//import * as express from "express";

import { ServerConfiguration } from "./core/ServerConfiguration";
import { ServerRunner } from "./core/ServerRunner";

let config:ServerConfiguration = {
    port: 3000
};

// let express = require('express');
// let app = express();

// app.listen(config.port, ()=> console.log(`App has Started!!!`));

let serverRunner = new ServerRunner();
serverRunner.run(config);
