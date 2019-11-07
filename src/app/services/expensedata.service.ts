import { ExpenseData } from './../home/expense';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensedataService {

  constructor() { }

getExpenseList(){
 return [
    {
    hostCurrency: "INR",
    total: 308*2,
    data:[
      {
       amount: 200,
       convertedAmount: 308,
       date: new Date ("2019-11-06T15:19:25.245+05:30"),
       name: "food",
       nativeCurrency: "JPY",
      }, {
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
   total: 10908*2,
   data:[
     {
       amount: 100,
       convertedAmount: 10908,
       date: new Date ("2019-11-04T15:40:12.354+05:30"),
       name: "travel",
       nativeCurrency: "JPY",
     },{
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
   total: 6039*2,
   data:[
     {
       amount: 50,
       convertedAmount: 6039,
       date: new Date ("2019-11-05T15:41:32.861+05:30"),
       name: "Rent",
       nativeCurrency: "JPY"
     }, {
       amount: 50,
       convertedAmount: 6039,
       date: new Date ("2019-11-03T15:41:32.861+05:30"),
       name: "Rent",
       nativeCurrency: "JPY"
     }
   ]
 }
  ];
}

}