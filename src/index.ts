//import * as express from "express";
import { ServerRunner } from "./core/ServerRunner";
import { MarkdownOptionsFactory } from "./markdownIt/MarkdownOptionsFactory";

let optionsFactory = new MarkdownOptionsFactory();
let serverConfiguration = optionsFactory.serverConfiguration;
let markdownOptions = optionsFactory.bogMarkdownOptions;

let serverRunner = new ServerRunner();
serverRunner.run(serverConfiguration, markdownOptions);