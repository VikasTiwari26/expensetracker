export interface Expense{
    date:Date,
    name:string,
    amount:number,
    convertedAmount:number,
    nativeCurrency:string
}

export interface ExpenseData{
    hostCurrency:string,
    total:number,
    data:Expense[]
}