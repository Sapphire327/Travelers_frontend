function getDateWithZero(date:number){
    if(date < 10)
        return '0'+date.toString()
    else
        return date.toString()
}
export const dataToString = (date:Date)=>{
   return getDateWithZero(date.getDate()).toString()+'.'+getDateWithZero(date.getMonth())
}
// 2025-06-10T00:00:00.000Z -> 10.06
export const stringDataToString = (date:string)=>{
    const data = new Date(Date.parse(date));
    return getDateWithZero(data.getDate()).toString()+'.'+getDateWithZero(data.getMonth())
}
export const dateToInputString = (date:string)=>{
    const data = new Date(Date.parse(date));
    return data.toISOString().split('T')[0];
}