import {ArgumentsHost, ExceptionFilter} from "@nestjs/common";
import {Catch} from "@nestjs/common";
import {Response} from "express";
import {BaseCustomException} from "../custom-exceptions/base-custom.exception";
import {i18nValidationMessage} from "nestjs-i18n";
import {I18nValidationException} from "nestjs-i18n/dist/interfaces";
import {formatInputValidationErrors} from "../Input-Validation/format-input-validation-errors";

@Catch()
export class CustomExceptionFilter implements ExceptionFilter{
    catch(exception,host:ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if(exception instanceof BaseCustomException){
          return  response.status(exception.status).json({
                errors:exception.formatError()
            })
        }
        else if (exception instanceof I18nValidationException){
          const formattedErrors=formatInputValidationErrors(exception.errors);
          return response.status(400).json({
              errors:formattedErrors
          })
        }

        //unknown exception
        console.log(exception);
        response.status(500).json({
            errors: [{ message: 'Internal Server Error' }],
        });

        }

}