import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class Todo{
    public id: number;
    public text: string;
    public createdAt: Date;
    public completedAt:Date | undefined;

    constructor(id: number, text: string, createdAt: Date, completedAt?: Date){
        this.id = id, 
        this.text = text, 
        this.createdAt = createdAt, 
        this.completedAt = completedAt

    }
}

export class TodosController{
    
    constructor(){

    }

    public getTodos = async (req: Request, res: Response) => {
        
        const todos = await prisma.todo.findMany();

        const response = todos.map(todo=> {
            return this.fromObject(todo);
        });

        return res.json(response);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id[0]! );
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        (!todo)
        ? res.status(404).json({error:"todo not found"})
        : res.json(todo);
    };

    public createTodo = async (req: Request, res: Response) => {
        const { text } =  req.body;

        const newTodo = await prisma.todo.create({
            data: {
                text: text
            }
        });
        return res.json( newTodo );
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id[0]! );
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }});

        if(!todo)
        {
            return res.status(404).json({error:"todo not found"});
        }

        const { text, completedAt = undefined } =  req.body;
         const newcompletedAt = completedAt || todo.completedAt;
         const newtext = text || todo.text;

         const newTodo = await prisma.todo.update({
            where:{
                id: id
            },
            data: {
                completedAt: newcompletedAt,
                text: newtext
            }            
         });
         console.log({newTodo});
        res.json(newTodo);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +(!req.params.id ? "0" : req.params.id[0]! );
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if(!todo)
        {
            return res.status(404).json({error:"todo not found"});
        }

        await prisma.todo.delete({
            where: {
                id: id
            }
        });
        res.json(todo);
    };

    fromObject = (obj: { [key: string]: any }): Todo=>{
        const {id, text, createdAt, completedAt} = obj;
        
        return new Todo(id, text, createdAt, completedAt);
    }
    
}