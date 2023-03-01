import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatuses } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Todo list',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatuses,
    example: TaskStatuses.DONE,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatuses)
  status: TaskStatuses;
}
