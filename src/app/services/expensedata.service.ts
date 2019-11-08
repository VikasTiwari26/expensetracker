import { ExpenseData } from './../home/expense';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExpensedataService {
  private _url:string="";
  private _url1:string="https://data.fixer.io/api/2018-11-08?access_key=34a2309b7823b60acea90f509f530c3d&base=USD";

  constructor(private http:HttpClient) { }

getExpenseList(){
 return 
}
getlatestConversionRate(id="latest"):Observable<any>{
  return this.http.get<any>(`https://data.fixer.io/api/${id}?access_key=34a2309b7823b60acea90f509f530c3d&base=USD`);

}
getPastConversionRate():Observable<any>{
  return this.http.get<any>(this._url1);

}

}
