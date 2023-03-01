import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { IPagination } from '../interfaces/pagination.interface';

export const Pagination = createParamDecorator(
  async (dto, ctx: ExecutionContext) => {
    const [req] = ctx.getArgs();
    const { page = 1, limit = 10 } = req.query;
    const pagination = plainToInstance<any, IPagination>(dto, { page, limit });

    const errors = await validate(pagination);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return {
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
    };
  },
);
