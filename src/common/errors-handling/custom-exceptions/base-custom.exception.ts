import {ErrorResponseInterface} from "../error-response.interface";

export abstract class BaseCustomException extends Error {
abstract status:number;

public constructor(message:string) {
    super(message);
}
 formatError():ErrorResponseInterface[]{
    return [{message:this.message}]
}
}
