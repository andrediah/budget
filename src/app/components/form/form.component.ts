import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/enums/category';
import { Dropdown } from 'src/app/interfaces/dropdown';
import { Expense } from 'src/app/interfaces/expense';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  enumKeys:any = Object.values(Category).filter(value => typeof value === 'number' && value !== 0);

  constructor(private budgetService:BudgetService) { }
  expenseList$:Observable<Expense[]> | undefined;
  totalExpense$:Observable<number> | undefined;

  newExpense:Expense = {
    Amount:0,
    Category:Category.start,
    Description:''
  }
  Category = Category;
  
  

  ngOnInit(): void {
    this.expenseList$ = this.budgetService.getBudget();
    this.totalExpense$ = this.budgetService.getTotal();

  }
  addExpense():void{
    let expense:Expense[] = [{Description:'Netflix',Amount:10,Category:Category.Entertainment}];
    let totalExpense:number = 0;
    let sub = this.expenseList$?.subscribe((exp)=>{
      expense = exp;
      totalExpense = expense.reduce((accumulator, object) => {
        return accumulator + object.Amount;
        }, 0);
    });
    sub?.unsubscribe();   

    

    console.log(expense);
     
   if (expense !== undefined && this.newExpense.Category !== Category.start ){
    expense.push(this.newExpense);
    this.budgetService.updateExpense(expense);

    totalExpense+= this.newExpense.Amount;
    this.budgetService.setTotal(totalExpense);
    this.newExpense = {
      Amount:0,
      Category:Category.start,
      Description:''
    }

   }
   console.log(expense);
  }
  onSelectedCointType(value:string): void {
   
		this.newExpense.Category = +value;
	}
  
}
