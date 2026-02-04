import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";



(()=>{
    main();
})();

function main(){
    const server = new Server({
        Port: envs.PORT, 
        Public_path: envs.PUBLIC_PATH,
        Routes: AppRoutes.routes});
    server.start();
}