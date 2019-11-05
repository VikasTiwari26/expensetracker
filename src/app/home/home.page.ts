import { Component } from '@angular/core';
import { Expense, ExpenseData } from './expense';
import * as moment from 'moment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  today:string =  moment().format();
  expenseList: Expense[] = [];
  data:ExpenseData[]=[];
  totalExpense:number=0;
  convertedTotalExpense:number=0;
  

  constructor() { }

  ngOnInit() { 
  }


  addExpense(frm){
    let expense:Expense;
     expense = frm.value;
     let selectedCurrency = expense.nativeCurrency;
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
            default:
                break;
          }
          
      this.expenseList.push(expense);
      this.totalExpense = this.totalExpense + expense.amount;
      this.convertedTotalExpense = this.convertedTotalExpense + expense.convertedAmount;
     
     frm.reset()
    }

}
  
