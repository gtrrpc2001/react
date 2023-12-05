import { getEcg, getEcgTime, getGraphBpmHrvArr } from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (eq:string,nowTime:string,time:string[]):Promise<graphBpmHrvArr[]> => {   
        const data:graphBpmHrvArr[] = await getGraphBpmHrvArr(`/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`)   
        return data;   
 }  
<<<<<<< HEAD

 export const getGraphEcgTime = async (eq:string,nowTime:string,time:string[]):Promise<any[]> => {         
        const data:any[] = await getEcgTime(`/mslecg/EcgTime?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`)   
        return data;   
 }

 export const getGraphEcgValue = async (eq:string,startTime:string,endTime:string):Promise<number[]> => {       
       const data:number[] = await getEcg(`/mslecg/GraphEcg?eq=${eq}&startDate=${startTime}&endDate=${endTime}`)
       return data;
 }
=======
>>>>>>> 3c61f463f6a7dc9d47dc1770272d42aae5d22c7e
