
//import * as express from "express";

import { ServerConfiguration } from "./core/ServerConfiguration";

let express = require('express');
let app = express();
let config:ServerConfiguration = {
    port: 3000
};

app.listen(config.port, ()=> console.log(`App has Started!!!`));