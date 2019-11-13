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
    items:FormData;
    amount:number=1;
    pastRateList:any;
    pastDate:string;
    selectedCurrency:SelectedCurrency;
    disabled=true;
    
    list:SelectedCurrency[]=[
      {
        currencyName:'Indian Rupee',
        currecyCode:'INR'

      },
      {
        currencyName:'Japanese Yen',
        currecyCode:'JPY'
      }
    ];

   

    constructor(private convertedAmountService:ExpensedataService) {
    }

  ngOnInit() {
    this.getLatestConversionRate(this.date);
  
  }

  getLatestConversionRate(date){
    this.convertedAmountService.getlatestConversionRate(date).subscribe(result => {
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
  };
  
addToList(){
  console.log(this.selectedCurrency);
  this.list.push({...this.selectedCurrency});
}

delete(content){
  let i = this.list.indexOf(content);
  this.list.splice(i,1);
}


handlePress(){
  this.disabled=!this.disabled;
  
}

}