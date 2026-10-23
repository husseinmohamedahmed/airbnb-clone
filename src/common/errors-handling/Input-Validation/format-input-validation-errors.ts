import { I18nValidationError } from 'nestjs-i18n/dist/interfaces/i18n-validation-error.interface';
import { ErrorResponseInterface } from '../error-response.interface';
import { ValidationError } from 'class-validator';

export const formatInputValidationErrors = (
  errors: I18nValidationError[],
): ErrorResponseInterface[] => {
  return errors
    .map((error: ValidationError) => {
      const constraints = error.constraints ?? {};
      const messages = Object.values(constraints);
      return messages.map((message) => {
        return {
          message: message,
          field: error.property,
        };
      });
    })
    .flat();
};
