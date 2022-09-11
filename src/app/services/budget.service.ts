import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../enums/category';
import { Expense } from '../interfaces/expense';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private _expenseList:BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([
    // {Description:'Water',Amount:100,Category:Category.Bills},
    // {Description:'Groceries',Amount:200,Category:Category.Food},
    // {Description:'Electricity',Amount:150,Category:Category.Bills},
    // {Description:'Netflix',Amount:170,Category:Category.Entertainment},
    // {Description:'G.A.P.',Amount:270,Category:Category.Clothing}
  ]);

  private _totalExpense:BehaviorSubject<number> = new BehaviorSubject<number> (0);
  private _totalBudget:BehaviorSubject<number> = new BehaviorSubject<number> (1000);
  constructor() { }

  getBudget():Observable<Expense[]> {
    return this._expenseList;
  }

  updateExpense(expense:Expense[]):void{
    this._expenseList.next(expense)
  }
  getTotalExpense():Observable<number>{
    return this._totalExpense;
  }
  setTotalExpense(newTotal:number):void{
    this._totalExpense.next(newTotal);
  }
  getTotalBudget():Observable<number>{
    return this._totalBudget;
  }
  setTotalBudget(newTotal:number):void{
    this._totalBudget.next(newTotal);
  }
}
