import { TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export interface UpdateTodoUseCase{
    execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase{

    constructor(private readonly todoRepo: TodoRepository){

    }
    
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepo.updateById(dto);
    }
}