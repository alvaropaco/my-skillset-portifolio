import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  create(title: string): Promise<Todo> {
    const todo = new Todo();
    todo.title = title;
    return this.todoRepository.save(todo);
  }

  async update(id: number, title: string, isCompleted: boolean): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoRepository.save(todo);
  }

  remove(id: number): Promise<void> {
    return this.todoRepository.delete(id).then(() => null);
  }
}
