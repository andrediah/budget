import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
  //totalExpense$:Observable<number> | undefined;
  //totalBudget$:Observable<number> | undefined;

  budgetSubscription : Subscription | undefined;
  expenseSubscription : Subscription | undefined;
  
  budget!:number;
  expense!:number;

  newExpense:Expense = {
    Amount:0,
    Category:Category.start,
    Description:''
  }
  Category = Category;
  
  

  ngOnInit(): void {
    this.expenseList$ = this.budgetService.getBudget();
    
    this.budgetSubscription = this.budgetService.getTotalBudget().subscribe((bud)=>{
      this.budget = bud;
    });
    this.expenseSubscription = this.budgetService.getTotalExpense().subscribe((exp)=>{
      this.expense = exp;
    });

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
    totalExpense += this.newExpense.Amount;
    //let budget:number = 0;
    // this.totalBudget$?.subscribe((bud)=>{
    //   budget = bud;
    // })

    if (expense !== undefined && this.newExpense.Category !== Category.start && totalExpense <= this.budget) {
      expense.push(this.newExpense);
      this.budgetService.updateExpense(expense);

      
      this.budgetService.setTotalExpense(totalExpense);
      this.newExpense = {
        Amount:0,
        Category:Category.start,
        Description:''
      }
    }
  }
  ngOnDestroy(){
    this.budgetSubscription?.unsubscribe();
    this.expenseSubscription?.unsubscribe();
  }
  onSelectedCategoryType(value:string): void {
   
		this.newExpense.Category = +value;
	}  
}
