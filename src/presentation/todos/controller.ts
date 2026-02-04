import { Request, Response } from "express";

const todos = [
                { id: 1, title: "Todo 1", completed: false, createdAt: new Date() },
                { id: 2, title: "Todo 2", completed: true, createdAt: new Date() },
                { id: 3, title: "Todo 3", completed: false, createdAt: new Date() }
            ];

export class TodosController{
    
    constructor(){

    }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id[0]! );
        const todo = todos.find(t => t.id === id);

        (todo)
        ? res.json(todo)
        : res.status(404).json({error:"todo not found"});
    };

    public createTodo = (req: Request, res: Response) => {
        const { title, completed } =  req.body;

        todos.push({id: todos.length+1, title, completed, createdAt: new Date()});
        return res.json( todos );
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id[0]! );
        const todo = todos.find(t => t.id === id);

        if(!todo)
        {
            return res.status(404).json({error:"todo not found"});
        }

        const { title, completed } =  req.body;
         todo.completed = completed || todo.completed;
         todo.title = title || todo.title;

        todo.title = title;
        res.json(todos);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id[0]! );
        const todo = todos.find(t => t.id === id);

        if(!todo)
        {
            return res.status(404).json({error:"todo not found"});
        }

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);

    };  
    
}