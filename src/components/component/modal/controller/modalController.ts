
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