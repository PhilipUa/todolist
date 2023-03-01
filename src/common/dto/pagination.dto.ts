import { Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number;

  @Min(1)
  @Max(50)
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
