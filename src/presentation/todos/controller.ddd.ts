import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepository } from "../../domain";

export class TodosControllerddd{
    
    constructor(
        private readonly todoRepository: TodoRepository
    ){

    }

    public getTodos = async (req: Request, res: Response) => {
        
        const todos = await this.todoRepository.getAll();

        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id! );
        try
        {
            const todo = await this.todoRepository.findById(id);

            (!todo)
            ? res.status(404).json({error:"todo not found"})
            : res.json(todo);
        }catch(error){
            res.status(400).json({error:error})
        }
    };

    public createTodo = async (req: Request, res: Response) => {        
        const [error, createToDo] = CreateTodoDto.create(req.body);        

        if(error) return res.status(400).json({error:error});

        const newTodo = await await this.todoRepository.create(createToDo);

        return res.json( newTodo );
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id! );        

        const [error, updateTodo] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(404).json({error:error});

        try
        {
            const todo = await this.todoRepository.updateById(updateTodo);
            if(!todo) return res.status(404).json({error:error});
            
            res.json(todo);
        } catch(error){
            return res.status(400).json({error:error});
        }
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id! );

        try
        {
            const todo = await this.todoRepository.deleteById(id);

            if(!todo)
            {
                return res.status(404).json({error:"todo not found"});
            }

            res.json(todo);
        }catch(error){
            return res.status(404).json({error:error});
        }
    };
}