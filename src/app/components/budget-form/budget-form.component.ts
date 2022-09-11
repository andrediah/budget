import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {

  constructor(private budgetService:BudgetService) { }
  budgetSubscription : Subscription | undefined;
  expenseSubscription : Subscription | undefined;

  newBudget!:number;
  expense!:number;

  ngOnInit(): void {
    this.getBudget();
    this.getExpense();
  }
  getBudget():void {
    this.budgetSubscription = this.budgetService.getTotalBudget().subscribe((bud)=>{
      this.newBudget = bud;
    });

  }
  getExpense():void {
    this.expenseSubscription = this.budgetService.getTotalExpense().subscribe((exp)=>{
      this.expense = exp;
    });

  }
  setBudget(){

    if (this.newBudget >= this.expense){
      this.budgetService.setTotalBudget(this.newBudget);
    }
    else{
      this.getBudget();
    }
  }
  
  ngOnDestroy(){
    this.budgetSubscription?.unsubscribe();
    this.expenseSubscription?.unsubscribe();
  }
}
