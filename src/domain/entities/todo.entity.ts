
export class TodoEntity {

    constructor(public id: number,
        public text: string,
        public createdAt?: Date,
        public completedAt?: Date | null) {
    }

    get isCompleted(): boolean{
        return !!this.completedAt;
    }

    public static fromObject = (obj: { [key: string]: any }): TodoEntity=>{
        const {id, text, createdAt, completedAt} = obj;

        let newCompletedAt;
        if(completedAt){
            newCompletedAt = new Date(completedAt);
            if(isNaN(newCompletedAt.getTime())){
                throw "completedAt must be a valid date."
            }
        }

        return new TodoEntity(id, text, createdAt, completedAt);
    }

}