import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/enums/category';
import { Expense } from 'src/app/interfaces/expense';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private budgetService:BudgetService) { }
  Category = Category;

  //expenseList:Expense[]=[     ]
  expenseList$:Observable<Expense[]> | undefined;
  ngOnInit(): void {
    //this.cartObservable$ = this.orderService.getOrderCount();
    this.expenseList$ = this.budgetService.getBudget();
  }

}
