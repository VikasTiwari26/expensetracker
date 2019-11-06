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
  expenseList: ExpenseData[] = [
    {
      
       hostCurrency: "INR",
       total: 308,
       data:[
         {
          amount: 200,
          convertedAmount: 308,
          date: new Date ("2019-11-06T15:19:25.245+05:30"),
          name: "food",
          nativeCurrency: "JPY",
         }
       ]
    },
    {
      
      hostCurrency: "INR",
      total: 308,
      data:[
        {
         amount: 200,
         convertedAmount: 308,
         date: new Date ("2018-11-06T15:19:25.245+05:30"),
         name: "food",
         nativeCurrency: "JPY",
        }
      ]
   },
    {
      hostCurrency: "USD",
      total: 10908,
      data:[
        {
          amount: 100,
          convertedAmount: 10908,
          date: new Date ("2019-11-04T15:40:12.354+05:30"),
          name: "travel",
          nativeCurrency: "JPY",
        }
      ]
    },
    {
      hostCurrency: "USD",
      total: 10908,
      data:[
        {
          amount: 100,
          convertedAmount: 10908,
          date: new Date ("2019-10-04T15:40:12.354+05:30"),
          name: "travel",
          nativeCurrency: "JPY",
        }
      ]
    },
    {
      hostCurrency: "EURO",
      total: 6039,
      data:[
        {
          amount: 50,
          convertedAmount: 6039,
          date: new Date ("2019-11-05T15:41:32.861+05:30"),
          name: "Rent",
          nativeCurrency: "JPY"
        }
      ]
    },
    {
      hostCurrency: "EURO",
      total: 6039,
      data:[
        {
          amount: 50,
          convertedAmount: 6039,
          date: new Date ("2019-11-03T15:41:32.861+05:30"),
          name: "Rent",
          nativeCurrency: "JPY"
        }
      ]
    }
  ];
  totalExpense:number=0;
  convertedTotalExpense:number=0;
  grandTotal: number=0;

 
  

  constructor() { }

  ngOnInit() { 
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
      let currentDate=moment().format('YYYY-MM-DD');
         this.expenseList.forEach((element)=>{
          let total =0;
          let arr = [];
          element.data.forEach(item => {
             let itemDate=moment(item.date).format('YYYY-MM-DD');
             console.log(moment(itemDate).isSame(currentDate));
            if(moment(itemDate).isSame(currentDate)){
              total=total+item.convertedAmount;
              arr.push(element);
            }
          });
          if(arr.length){
          this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
        }
        });
    }

    yesterday(){
      let currentDate=moment().format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
          console.log(moment(itemDate).isBefore(currentDate,'day'));
         if(moment(itemDate).isBefore(currentDate,'day')){
           total=total+item.convertedAmount;
           arr.push(element);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       console.log(this.filterdArray);
     }
     });
    }

    lastWeek(){

    }

    lastMonth(){
      let currentDate=moment().format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
          console.log(moment(itemDate).isBefore(currentDate,'month'));
         if(moment(itemDate).isBefore(currentDate,'month')){
           total=total+item.convertedAmount;
           arr.push(element);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       console.log(this.filterdArray);
     }
     });
    }

    lastYear(){
      let currentDate=moment().format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
          console.log(moment(itemDate).isBefore(currentDate,'year'));
         if(moment(itemDate).isBefore(currentDate,'year')){
           total=total+item.convertedAmount;
           arr.push(element);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       console.log(this.filterdArray);
     }
     });
    }

    totalExpenditure(){
      let currentDate=moment().format('YYYY-MM-DD');
      this.expenseList.forEach((element)=>{
       let total =0;
       let arr = [];
       element.data.forEach(item => {
          let itemDate=moment(item.date).format('YYYY-MM-DD');
          console.log(moment(itemDate).isBefore(currentDate,'day'));
         if(moment(itemDate).isBefore(currentDate,'day')){
           total=total+item.convertedAmount;
           arr.push(element);
         }
       });
       if(arr.length){
       this.filterdArray.push({hostCurrency:element.hostCurrency,total:element.total,data:arr});
       console.log(this.filterdArray);
     }
     });
    }

}
  
