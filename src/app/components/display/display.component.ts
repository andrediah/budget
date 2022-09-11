import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private budgetService:BudgetService) { }
  expenseList$:Observable<Expense[]> | undefined;
  totalExpense$:Observable<number> | undefined;
  totalBudget$:Observable<number> | undefined;
  
  
  
  
  ngOnInit(): void {
    this.expenseList$ = this.budgetService.getBudget();
    this.totalExpense$ = this.budgetService.getTotalExpense();    
    this.totalBudget$ = this.budgetService.getTotalBudget();    
  }

}
