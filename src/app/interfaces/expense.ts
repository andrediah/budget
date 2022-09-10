import { Category } from "../enums/category";

export interface Expense {
    Description: string,
    Category: Category ,
    Amount: number
}
