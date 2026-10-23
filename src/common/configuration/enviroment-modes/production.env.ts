import {defaultEnv} from "./default.env";
import {EnviromentInterface} from "../enviroment.interface";
export const productionEnv=():EnviromentInterface=>{
    return {
        ...defaultEnv(),
        port:5000,
    }
}