import { getData, postData } from "../axios/api/serverApi";
import { getTime } from "../func/func";

export const tryLogin = async (email:string,pw:string):Promise<boolean> => {    
    const data:any = await getData(`/msl/CheckLogin?empid=${email}&pw=${pw}`)   
    return data.includes('true');
 }  
 
 export const saveLog = async (email:string,active:string):Promise<boolean> => {    
     let body = {'kind':'web','구분':'근로자','아이디':email,'성명':'','날짜':getTime(true),'활동':active}
     const data:any = await postData(`/admin_login_log/api_getdata`,body)
     return data.includes('true');
  }