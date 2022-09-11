import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/enums/category';
import { CategorySummary } from 'src/app/interfaces/category-summary';
import { Expense } from 'src/app/interfaces/expense';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private budgetService:BudgetService) { }
  //expenseList$:Observable<Expense[]> | undefined;
  totalExpense$:Observable<number> | undefined;
  totalBudget$:Observable<number> | undefined;

  subscription : Subscription | undefined;
  Category = Category;
  summary: CategorySummary[] = [];
  ngOnInit(): void {
    //this.expenseList$ = this.budgetService.getBudget();
    this.totalExpense$ = this.budgetService.getTotalExpense();    
    this.totalBudget$ = this.budgetService.getTotalBudget();    
    this.calculateSummary();
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
  calculateSummary():void{
    
    this.subscription =  this.budgetService.getBudget()
    .subscribe((bud) => {
      this.summary = [];
      bud.forEach((e)=>{
        let cat = this.summary.filter(c => c.Description === Category[e.Category]);
        if (cat[0] !== undefined){
          console.log(cat[0]);
          cat[0].Value += e.Amount;
        }else {
          let s:CategorySummary = {
            Description : Category[e.Category],
            Value: e.Amount
          };          
          this.summary.push(s);
        }

        
      })
    });
       

  }

}
