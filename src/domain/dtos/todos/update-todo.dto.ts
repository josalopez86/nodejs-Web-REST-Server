

export class UpdateTodoDto{
    public readonly id: number;
    public readonly text: string | undefined;
    public readonly completedAt: Date | undefined;
    
    private constructor( id: number, text?: string, completedAt?: Date){
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }

    static create(props: {[key: string]: any}): [string | undefined, UpdateTodoDto]{

        const { text, completedAt, id } = props;

        let newCompletedAt = completedAt;

        if (!id || isNaN(id)) {
                return ["id is required!!", new UpdateTodoDto(0)];
            }

        if (completedAt !== undefined) {
            newCompletedAt = new Date(completedAt);

            if (isNaN(newCompletedAt.getTime())) {
                return ["completedAt must be a valid date", new UpdateTodoDto(0)];
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}