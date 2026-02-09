import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource{
    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

        const newTodo = await prisma.todo.create({
            data: {
                text: createTodoDto.text}
        });
        

        return TodoEntity.fromObject(newTodo);
    }
    
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);        

        const newCompletedAt = (updateTodoDto.completedAt === undefined) ? (todo.completedAt== null ? null : todo.completedAt!): updateTodoDto.completedAt!;
        const newText= (updateTodoDto.text === undefined) ? todo.text : updateTodoDto.text;
        
        const newTodo = await prisma.todo.update({
            where:{
                id: updateTodoDto.id
            },            
            data: {
                ...todo,
                createdAt: todo.createdAt!,
                completedAt: newCompletedAt,
                text: newText
            }            
         });
        return TodoEntity.fromObject(newTodo);
        
    }
    
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        
        });

        const response = todos.map(todo=> {
            return TodoEntity.fromObject(todo);
        });

        return response;
    }
    
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {
                id:id
            }
        });

        if(!todo){
            throw "Todo not found.";
        }

        return TodoEntity.fromObject(todo);
    }

    async deleteById(id: number): Promise<TodoEntity> {

        await this.findById(id);

        const deletedTodo = await prisma.todo.delete({
            where: {
                id:id
            }
        });
        
        return TodoEntity.fromObject(deletedTodo);
    }

}