import express, { Router } from "express";
import path from "node:path";

interface Options {
    Port: number,
    Public_path: string,
    Routes: Router
}


export class Server{

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const {Port, Public_path, Routes} = options;
        this.port = Port;
        this.publicPath = Public_path;
        this.routes = Routes;
    }

    async start(){

        //middlewares
        this.app.use(express.json());//raw
        this.app.use(express.urlencoded({extended: true}));//x-www-form-urlencoded

        //public folder
        this.app.use(express.static(this.publicPath));

        //Routes
        this.app.use(this.routes);


        //Cualquier ruta que no exista, enviar el index.html (SPA)
        this.app.get(/.*/,  (req, res)=>{
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);

        });



        this.app.listen(this.port, () =>{
            console.log(`server running on port ${this.port}.`);
        });
    }
}