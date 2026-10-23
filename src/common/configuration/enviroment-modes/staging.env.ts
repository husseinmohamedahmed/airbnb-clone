import {defaultEnv} from "./default.env";
import {EnviromentInterface} from "../enviroment.interface";
export const stagingEnv=():EnviromentInterface=>{
    return {
        ...defaultEnv(),
        port:6000
    }
}