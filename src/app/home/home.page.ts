import { currencyList } from './currency';
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
  currencyList=currencyList;
  latestRateList:any;
  
  filterdArray:ExpenseData[]=[];
  currentDate:string =  moment().format('YYYY-MM-DD');
  public expenseList = [];
  totalExpense:number=0;
  convertedTotalExpense:number=0;
  grandTotal: number=0;
  pastDate:string;
  pastRateList:any;


  constructor(private expenseListService:ExpensedataService) {
    
  }
  
  ngOnInit() { 
    this.getLatestConversionRate();
  
    this.finalExpenditure();
    
  }
  getLatestConversionRate(){
    this.expenseListService.getlatestConversionRate().subscribe(result => {
      console.log(result);
      this.latestRateList=result.rates;
    },
    error =>{
      console.log(error);
    })
  }

  addExpense(frm){
    console.log(frm.value);
    let expense:Expense;
    let hostCurr=frm.value.hostCurrency;
    let date = moment(frm.value.date).format('YYYY-MM-DD').toString();
    delete frm.value.hostCurrency;
     expense = frm.value;
     if(this.currentDate == date){
          expense.convertedAmount = (this.latestRateList['JPY']/this.latestRateList[hostCurr.currecyCode])*expense.amount;
          this.addToList(hostCurr,expense);
      
        } else {
       if(this.pastDate==date){
        expense.convertedAmount = (this.pastRateList['JPY']/this.pastRateList[hostCurr.currecyCode])*expense.amount;
        console.log(this.pastRateList);
        this.addToList(hostCurr,expense);

      }
       else{
        this.expenseListService.getlatestConversionRate(date).subscribe(result => {
          console.log(result);
          this.pastRateList=result.rates;
          this.pastDate=date;
          expense.convertedAmount = (result.rates['JPY']/result.rates[hostCurr.currecyCode])*expense.amount;
          console.log(expense.convertedAmount);
          this.addToList(hostCurr,expense);
          },
        error =>{
          console.log(error);
        })
        
       }
     }
         
          

           

     frm.reset()
    }
    
    addToList(hostCurr,expense){
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
    }

    listSelector(event){
      console.log(event);
      let selectedEvent = event.detail.value;
        switch(selectedEvent){
          case('today'):{
            this.filterdArray=[];
            this.today();
            break;
          }
          case('yesterday'):{
            this.filterdArray=[];
            this.yesterday();
            break;
          }
          case('lastWeek'):{
            this.filterdArray=[];
            this.lastWeek();
            break;
          }
          case('lastMonth'):{
            this.filterdArray=[];
            this.lastMonth();
            break;
          }
          case('lastYear'):{
            this.filterdArray=[];
            this.lastYear();
            break;
          }
          case('totalExpenditure'):{
            this.filterdArray=[];

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
              console.log(total);
              console.log(item.convertedAmount);
              arr.push(item);
            }
          });

          if(arr.length){
          this.filterdArray.push({hostCurrency:element.hostCurrency.currencyName,total:element.total,data:arr});
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
           console.log(total);
           console.log(item.convertedAmount);
           arr.push(item);
         }
       });
       if(arr.length){
        this.filterdArray.push({hostCurrency:element.hostCurrency.currencyName,total:element.total,data:arr});
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
           console.log(total);
           console.log(item.convertedAmount);
         }
       });
       if(arr.length){
        this.filterdArray.push({hostCurrency:element.hostCurrency.currencyName,total:element.total,data:arr});
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
           console.log(total);
           console.log(item.convertedAmount);
           arr.push(item);
         }
       });
       if(arr.length){
        this.filterdArray.push({hostCurrency:element.hostCurrency.currencyName,total:element.total,data:arr});
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
           console.log(total);
           console.log(item.convertedAmount);
           arr.push(item);
         }
       });
       if(arr.length){
        this.filterdArray.push({hostCurrency:element.hostCurrency.currencyName,total:element.total,data:arr});
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
           console.log(total);
           console.log(item.convertedAmount);
           arr.push(item);
         }
       });
       if(arr.length){
        this.filterdArray.push({hostCurrency:element.hostCurrency.currencyName,total:element.total,data:arr});
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
  
