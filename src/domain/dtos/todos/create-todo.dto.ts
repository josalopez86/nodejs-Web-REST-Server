

export class CreateTodoDto{

    public readonly text: string;
    
    private constructor(text: string){
        this.text = text;
    }

    static create(props: {[key: string]: any}): [string | undefined, CreateTodoDto]{

        const { text } = props;

        if(!text) return ["Text is required", new CreateTodoDto("")];
        
        return [undefined, new CreateTodoDto(text)];
    }
}