import {SelectedCurrency } from './convertedAmount';
export interface FormData {
    date:Date,
    amount:number,
    inputCurrency:SelectedCurrency,
    userSelectedCurrency:SelectedCurrency

}

export interface SelectedCurrency{
    currencyName:string;
    currecyCode:string;
}