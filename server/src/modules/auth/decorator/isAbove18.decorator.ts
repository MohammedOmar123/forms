/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAbove18 implements ValidatorConstraintInterface {
  validate(birthDate: string) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return new Date(birthDate) < date;
  }
}

export function IsAbove18YearsOld(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAbove18,
    });
  };
}
