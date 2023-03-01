import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskService } from './tasks.service';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatuses, User as IUser } from '@prisma/client';
import { Pagination } from '../common/decorators/pagination.decorator';
import { Filter } from '../common/decorators/filter.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../common/decorators/user.decorator';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @ApiQuery({ name: 'status', enum: TaskStatuses, required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get()
  findAll(
    @User() user: IUser,
    @Filter(FilterTaskDto) filter,
    @Pagination(PaginationDto) paginate,
  ) {
    return this.taskService.findAll({ ...filter, userId: user.id }, paginate);
  }

  @Get(':id')
  findOne(@User() user: IUser, @Param('id') id: string) {
    return this.taskService.findOne({ id, userId: user.id });
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @User() user: IUser) {
    return this.taskService.create({
      ...createTaskDto,
      userId: user.id,
    });
  }

  @Patch(':id')
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  remove(@User() user: IUser, @Param('id') id: string) {
    return this.taskService.delete(id, user.id);
  }
}
