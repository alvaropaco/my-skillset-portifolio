import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  async todo(@Args('id') id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Mutation(returns => Todo)
  async createTodo(@Args('title') title: string): Promise<Todo> {
    return this.todoService.create(title);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('isCompleted') isCompleted: boolean,
  ): Promise<Todo> {
    return this.todoService.update(id, title, isCompleted);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: number): Promise<boolean> {
    await this.todoService.remove(id);
    return true;
  }
}
