import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'uniqueEmail' })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return !existingUser;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email "${args.value}" is already taken`;
  }
}

export function Unique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueEmail,
    });
  };
}
