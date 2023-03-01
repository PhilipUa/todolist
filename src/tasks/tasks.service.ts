import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters, paginate): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: filters,
      ...paginate,
    });
  }

  async findOne(params): Promise<Task> {
    return this.prisma.task.findUniqueOrThrow({
      where: params,
    });
  }

  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(
    id: string,
    data: Prisma.TaskUpdateInput,
    userId: string,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id, userId },
    });
  }
}
