import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../enums/category';
import { Expense } from '../interfaces/expense';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private _expenseList:BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([
    {Description:'Water',Amount:10,Category:Category.Bills},
    {Description:'Groceries',Amount:10,Category:Category.Food},
    {Description:'Electricity',Amount:10,Category:Category.Bills},
    {Description:'Netflix',Amount:10,Category:Category.Entertainment}
  ])
  private _totalExpense:BehaviorSubject<number> = new BehaviorSubject<number> (10);
  constructor() { }

  getBudget():Observable<Expense[]> {
    return this._expenseList;
  }

  updateExpense(expense:Expense[]):void{
    this._expenseList.next(expense)
  }
  getTotal():Observable<number>{
    return this._totalExpense;
  }
  setTotal(newTotal:number):void{
    this._totalExpense.next(newTotal);
  }
}
