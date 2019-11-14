import { SelectedCurrency } from './convertedAmount';
import { ExpensedataService } from './../services/expensedata.service';
import { currencyList } from './../home/currency';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'hammerjs'





@Component({
  selector: 'app-currencyconverter',
  templateUrl: './currencyconverter.component.html',
  styleUrls: ['./currencyconverter.component.scss'],
})
export class CurrencyconverterComponent implements OnInit {

    date:string =  moment().format('YYYY-MM-DD');
    currentDate:string =  moment().format('YYYY-MM-DD');
    currencyList=currencyList;
    latestRateList:any[]=[];
    baseCurrency:SelectedCurrency={
      currencyName:'United States Dollar',
      currecyCode:'USD'
    };
   
    amount:number=1;
    pastRateList:any;
    pastDate:string;
    newCurrency:SelectedCurrency;
    disabled=true;


    
    list:SelectedCurrency[]=[
      {
        currecyCode:'INR',
        currencyName:'Indian Rupee'
       

      },
      {
        currecyCode:'JPY',
        currencyName:'Japanese Yen'
      }
    ];

   

    constructor(private convertedAmountService:ExpensedataService) {
    }

  ngOnInit() {
    
    this.getLatestConversionRate();
  
  }

  getLatestConversionRate(){
    this.date=moment(this.date).format('YYYY-MM-DD');
    this.convertedAmountService.getlatestConversionRate(this.date).subscribe(result => {
      console.log(result);
      this.latestRateList=result.rates;
    },
    error =>{
      console.log(error);
    })
  }



  doReorder(ev:any){
    console.log(ev.detail);
    ev.detail.complete();
    console.log(this.list)
  };
  
addToList(){
  console.log(this.newCurrency);
  this.list.push({...this.newCurrency});
}

delete(content){
  let i = this.list.indexOf(content);
  this.list.splice(i,1);
}


handlePress(){
  this.disabled=!this.disabled;
  
}

}