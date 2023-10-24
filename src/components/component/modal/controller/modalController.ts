import { userBpmType } from "../../../../axios/interface/bpmType"
import { historyLast } from "../../../../axios/interface/history_last"
import { modalValues } from "../../../../axios/interface/modalvalues"
import { getHour } from "../../../../func/func"

export const getHeartText = (arrCnt:number):string => {
    let value:string = "양호"
    if(arrCnt < 30){
      value = "좋음"
    }else if(arrCnt > 30 && arrCnt < 50)
    {
      value = "양호"
    }else if(arrCnt > 50 && arrCnt < 75){
      value = "보통"
    }else if(arrCnt > 75)
     value = "심각"
      
    return value
  }

  export const getUserBpmType = (bpm:number):userBpmType => { 
    let bpmTypeList:userBpmType = {rest:true,activity:false,sleep:false}
    const setSleepTime:number = 23
    const setUpTime:number = 7
    let nowHours = getHour()
    const setBpm:number = 90
    //설정 bpm  >= bpm 일경우 

    if(setSleepTime <= nowHours || setUpTime > nowHours)
    {
      bpmTypeList = {rest:false,activity:false,sleep:true}
    }else{
      if(setBpm <= bpm)
        bpmTypeList = {rest:false,activity:true,sleep:false}
      
    }
    return bpmTypeList;
  }

  export const getValues = (data:historyLast[],eq:string):modalValues => {    
    let modalList:modalValues = {bpm:0,arrCnt:0,actCal:0,step:0,temp:0,distance:0}
    let row 
   for (var i = 0 ; i < data?.length; i++){
     if(data[i].eq == eq){
       row = data[i]
       modalList = {bpm:row.bpm,arrCnt:row.arrcnt,actCal:row.calexe,step:row.step,temp:row.temp,distance:row.distanceKM}             
       break;
     }
   }     
   return modalList;
  }