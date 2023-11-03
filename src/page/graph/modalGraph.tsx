import { useEffect, useRef, useState } from "react";
import { getEcg } from "../../axios/api/serverApi";
import {
  LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
} from 'recharts';

type Porps = {
    bpm:number
    eq:string
    time:string
}



export const ModalRealTimeGraph = ({bpm,eq,time}:Porps) => {  
    const [ecgData,setEcgData] = useState<number[]>([]);
    const [open , setOpen] = useState<boolean>(true);
    const ecgRef = useRef<any>()
    
    const setData = ecgData?.map(d=>{
      return {ecg:d,xAxis:d}
    })   
    
    useEffect(() => {
        const getEcgData = async() =>  {
            try{
                const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)                
                // ecgRef.current = result
                if(open){
                  setEcgData(result)
                  setOpen(false)
                }else{
                  let data = ecgData
                  result.map(d=>{
                      data?.shift()
                      data.push(d)
                                       
                  })
                  setEcgData(data)                   
                }
            }catch(E){
                console.log(E)
            }                      
        }
        
        const timer = setInterval(async()=>{          
           await getEcgData()          
           
        },1000)

        
        return (() => clearTimeout(timer));
        
    },[bpm])    
     
      
    return (
      <LineChart
            width={335}
            height={280}
            data={setData}  
         >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0,560]} width={0} height={0} /> 
        <YAxis yAxisId="left" domain={[0,1000]} width={30}/>
        <Tooltip active={true}/>               
        <Line yAxisId="left" type="monotone" dataKey="ecg" stroke="#8884d8" dot={false} />
      </LineChart>
    );
};



