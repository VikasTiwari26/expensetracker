import { ExpensedataService } from './../services/expensedata.service';
import { element } from 'protractor';
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

  filterdArray:ExpenseData[]=[];
  currentDate:string =  moment().format();
  public expenseList = [];
  totalExpense:number=0;
  convertedTotalExpense:number=0;
  grandTotal: number=0;


  constructor(private _expenseListService:ExpensedataService) {
    
  }

  ngOnInit() { 
    this.expenseList = this._expenseListService.getExpenseList();
    this.finalExpenditure();
  }


  addExpense(frm){
    let expense:Expense;
    let hostCurr=frm.value.hostCurrency;
    delete frm.value.hostCurrency;
     expense = frm.value;
          switch(hostCurr){
            case'USD':{
              expense.convertedAmount = 109.08*expense.amount
              break;
            }
            case'EURO':{
              expense.convertedAmount = 120.78*expense.amount
              break;
            }
            case'INR':{
              expense.convertedAmount = 1.54*expense.amount
              break;
            }
            default:
                break;
          }
          let expenseFlag=false;
         this.expenseList.forEach((element,index) => {
          if(element.hostCurrency == hostCurr){
            expenseFlag=true;
            this.expenseList[index].data.push(expense);
            this.expenseList[index].total=element.total+expense.convertedAmount;
            this.grandTotal=this.grandTotal+expense.convertedAmount;
            return;
          };
          });
          if(!expenseFlag){
            this.expenseList.push({hostCurrency:hostCurr,data:[{...expense}],total:expense.convertedAmount})
            this.grandTotal=this.grandTotal+expense.convertedAmount;

          }

           

     frm.reset()
    }
    

    listSelector(event){
      console.log(event);
      let selectedEvent = event.detail.value;
        switch(selectedEvent){
          case('today'):{
            this.today();
            break;
          }
          case('yesterday'):{
            this.yesterday();
            break;
          }
          case('lastWeek'):{
            this.lastWeek();
            break;
          }
          case('lastMonth'):{
            this.lastMonth();
            break;
          }
          case('lastYear'):{
            this.lastYear();
            break;
          }
          case('totalExpenditure'):{
            this.totalExpenditure();
            break;
          }
        }
    }

    today(){
      let sum=0;
      let currentDate=moment().format('YYYY-MM-DD');
         this.expenseList.forEach((element)=>{
          let total =0;
          let arr = [];
          element.data.forEach(item => {
             let itemDate=moment(item.date).format('YYYY-MM-DD');
            if(moment(itemDate).isSame(currentDate)){
              total=total+item.convertedAmount;
              arr.push(item);
            }
          });

          if(arr.length){
          this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
          sum=sum+total;
          
        }
        });
        this.grandTotal=sum;
        console.log(this.grandTotal);
    }


    yesterday(){
      let sum=0;
      let currentDate=moment().subtract(1,'day').format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
         if(moment(itemDate).isSame(currentDate)){
           total=total+item.convertedAmount;
           arr.push(item);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       sum=sum+total;
     }
     });
        this.grandTotal=sum;
        console.log(this.grandTotal);
    }

    lastWeek(){
      let sum=0;
      let currentDate=moment().subtract(7,'days').format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
         if(moment(itemDate).isAfter(currentDate)){
           total=total+item.convertedAmount;
           arr.push(item);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       sum=sum+total;
     }
     });
     this.grandTotal=sum;
     console.log(this.grandTotal);
    }

    lastMonth(){
      let sum =0;
      let currentDate=moment().subtract(30,'days').format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
         if(moment(itemDate).isAfter(currentDate)){
           total=total+item.convertedAmount;
           arr.push(item);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       sum=sum+total;
     }
     });
     this.grandTotal=sum;
     console.log(this.grandTotal);
    }

    lastYear(){
      let sum =0;
      let currentDate=moment().format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
         if(moment(itemDate).isBefore(currentDate,'year')){
           total=total+item.convertedAmount;
           arr.push(item);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       sum=sum+total;
     }
     });
     this.grandTotal=sum;
     console.log(this.grandTotal);
    }

    totalExpenditure(){
      let sum=0;
      let currentDate=moment().format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
         if(moment(itemDate).isSameOrBefore(currentDate,'day')){
           total=total+item.convertedAmount;
           arr.push(item);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       sum=sum+total;
     }
     });
     this.grandTotal=sum;
     console.log(this.grandTotal);
    }

    finalExpenditure(){
      let total=0;
      this.expenseList.forEach((elem)=>{
        total=total+elem.total;
      })
      this.grandTotal=total
    }

}
  
