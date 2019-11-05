export interface Expense{
    date:Date,
    name:string,
    currency:string,
    amount:number,
    convertedAmount:number,
}

export interface ExpenseData{
    nativeCurrency:string,
    total:number,
    data:Expense[]
}