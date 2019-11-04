import { Component } from '@angular/core';
import { Expense } from './expense';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  expenseList: Expense[] = [];
  totalExpense:number=0;
  convertedTotalExpense:number=0;

  addExpense(frm){
  let expense:Expense;
   expense = frm.value;
   let selectedCurrency= expense.nativeCurrency;
        switch(selectedCurrency){
          case'INR(70)':{
            expense.convertedAmount= 70*expense.amount
            break;
          }
          case'INR(60)':{
            expense.convertedAmount= 60*expense.amount
            break;
          }
          case'INR(50)':{
            expense.convertedAmount= 50*expense.amount
            break;
          }
          default:{
              break;
          }
        }
        
    this.expenseList.push(expense);
    this.totalExpense = this.totalExpense + expense.amount;
    this.convertedTotalExpense = this.convertedTotalExpense + expense.convertedAmount;
   
   frm.reset()
  }
 
  constructor() { }

  ngOnInit() { 
  }

}
  
