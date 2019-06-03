//import { ExpressServerFactory } from "./expressServerFactory";
import factory = require('./expressServerFactory');


export class Bootstrapper {
    
    private readonly configOptions: any = {
        port: 3000
    };

    public run(): void {
        let serverFactory = new factory.ExpressServerFactory();
        let app = serverFactory.build(this.configOptions);
        this.start(app);
    }

    private start(app:any):void{
        app.listen(this.configOptions, () => console.log(`Example app listening on port ${this.configOptions.port}!`));
    }
}
