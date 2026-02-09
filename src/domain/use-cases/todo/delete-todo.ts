import { TodoEntity, TodoRepository } from "../../domain";

export interface DeleteTodoUseCase{
    execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase{

    constructor(private readonly todoRepo: TodoRepository){

    }
    
    execute(id: number): Promise<TodoEntity> {
        return this.todoRepo.deleteById(id);
    }
}