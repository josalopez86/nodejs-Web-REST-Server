import { CreateTodoDto, TodoEntity, TodoRepository } from "../../domain";

export interface CreateTodoUseCase{
    execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase{

    constructor(private readonly todoRepo: TodoRepository){

    }
    
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoRepo.create(dto);
    }
}