
export const getTime = (includeTime:boolean):string => {
    const today = new Date()
    const year = today.getFullYear()
              const month = today.getMonth() + 1
              var monthStr: string = month < 10 ? `0${month}` : month.toString()        
              const date = today.getDate()    
              var dateStr: string = date < 10 ? `0${date}` : date.toString()
              if(includeTime){
                  const hour = today.getHours()
                  var getHour = hour < 10 ? `0${hour}` : hour.toString()
                  const minute = today.getMinutes()
                  var getMinute = minute < 10 ? `0${minute}` : minute.toString()
                  const second = today.getSeconds()
                  var getSecond = second < 10 ? `0${second}` : second.toString()
                  return `${year}-${monthStr}-${dateStr} ${getHour}:${getMinute}:${getSecond}`
              }else{
                return `${year}-${monthStr}-${dateStr}`
              }      

}