import date from "./date";

const getMonthTime = function(month){
    let monthArr=[];
    let nextMonth = 0;
    let nextYear = 0;
    const today = new Date();
    if(month){
        monthArr = month.split("-");
    }else{
        monthArr = [today.getFullYear(),today.getMonth()+1];
    }
    if(monthArr[1]==12){
        nextMonth = 1;
        nextYear = parseInt(monthArr[0])+1;
    }else{
        nextMonth = parseInt(monthArr[1])+1;
        nextYear = parseInt(monthArr[0]);
    }
    let dateStart = date(Date.parse(new Date(monthArr[0], parseInt(monthArr[1])-1, 1, 0, 0, 0)));
    let dateEnd = date(Date.parse(new Date(nextYear, parseInt(nextMonth)-1, 1, 0, 0, 0)));
    console.log(monthArr,{beginTime:dateStart,endTime:dateEnd});
    return {beginTime:dateStart,endTime:dateEnd,realMonth:monthArr.join("-")};
}

export default getMonthTime;