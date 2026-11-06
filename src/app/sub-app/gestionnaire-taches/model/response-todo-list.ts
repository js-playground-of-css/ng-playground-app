import { HttpStatus } from "../../../model/http-status";

export interface ResponseTodoList {
    message: String;
    code: number;
    httpStatus: HttpStatus;
}