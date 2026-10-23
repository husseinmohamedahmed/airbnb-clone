import { IsEmail } from 'class-validator';
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateHelloDto{
@IsEmail({},{ message: i18nValidationMessage("validation.EMAIL_NOT_FORMATTED")})
email:string
}