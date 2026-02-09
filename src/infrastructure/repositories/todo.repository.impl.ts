import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository{
    constructor(private readonly todoDatasource: TodoDatasource){

    }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.create(createTodoDto);
    }

    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.updateById(updateTodoDto);
    }

    getAll(): Promise<TodoEntity[]> {
        return this.todoDatasource.getAll();
    }

    findById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.findById(id);
    }
    
    deleteById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.deleteById(id);
    }

}