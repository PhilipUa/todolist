import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const Filter = createParamDecorator(
  async (dto, ctx: ExecutionContext) => {
    const [req] = ctx.getArgs();
    const { query } = req;
    const filter = plainToInstance(dto, query, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });

    const errors = await validate(filter);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return filter;
  },
);
