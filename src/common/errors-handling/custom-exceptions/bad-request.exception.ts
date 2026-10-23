import {BaseCustomException} from "./base-custom.exception";


export class BadRequestException extends BaseCustomException{
    status:number=400
    constructor(message:string) {
        super(message);

    }
}