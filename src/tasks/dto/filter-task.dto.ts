import { IsEnum, IsOptional } from "class-validator";
import { TaskStatuses } from '@prisma/client';
import { Expose } from 'class-transformer';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatuses)
  @Expose()
  status: number;
}
