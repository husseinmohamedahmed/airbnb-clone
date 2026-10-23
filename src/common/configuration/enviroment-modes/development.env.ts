import {defaultEnv} from "./default.env";
import {EnviromentInterface} from "../enviroment.interface";
export const developmentEnv=():EnviromentInterface=>{
    return {
        ...defaultEnv(),
    }
}