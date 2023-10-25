import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo,
   ]), 
 ],
  providers: [TodoResolver, TodoService]
})
export class TodoModule {}
