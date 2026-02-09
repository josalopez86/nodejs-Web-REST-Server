import { TodoEntity, TodoRepository } from "../../domain";

export interface GetTodosUseCase{
    execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase{

    constructor(private readonly todoRepo: TodoRepository){

    }
    
    execute(): Promise<TodoEntity[]> {
        return this.todoRepo.getAll()
    }
}