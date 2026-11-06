
export class Todo {

    constructor(
        private TodoId : number,
        private todoTitle : string,
        private todoDescription : string,
        private isComplete : boolean,
        private todoDate : Date,
        private creationDate : Date,
        private updateDate : Date
    ) {}

    getId() {
        return this.TodoId;
    }

    getTitle() {
        return this.todoTitle;
    }

    getDescription() {
        return this.todoDescription;
    }

    isCompleted() {
        return this.isComplete;
    }

    getEndDate() {
        return this.todoDate;
    }

    getCreationDate() {
        return this.creationDate;
    }

    getUpdateDate() {
        return this.updateDate;
    }

}