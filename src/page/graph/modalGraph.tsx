import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { getEcg } from "../../axios/api/serverApi";

type Porps = {
    bpm:number
    categories:number[]
    eq:string
    time:string
}

export const ModalRealTimeGraph = ({bpm,categories,eq,time}:Porps) => {  
    const [ecgData,setEcgData] = useState<number[]>([]);
    const dataRef = useRef<number[]>();
    
    useEffect(() => {
        const getEcgData = async() =>  {
            try{
                const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)                
                // dataRef.current = result
                // console.log(dataRef.current)
                setEcgData(result)                
            }catch(E){
                console.log(E)
            }                      
        }
        const timer = setInterval(async()=>{
             await getEcgData()                  
        },)

        return (() => clearTimeout(timer))
    },[bpm])    
 
      const series = [
        {
          name: "series-1",
          data: ecgData,
          
        }
      ]
    const options = {
        chart: {
          id: "realtime",
          animation:{
            enabled:true,
            easing:"linear",            
            speed:10,            
            dynamicAnimation:{
                enabled:true,
                speed:10
            }
          },
          toolbar:{
            show:false
          }
        }, 
             
        xaxis: {
          categories: categories,
          labels:{show:false}
        },
        fill:{

        },
        yaxis:{
            show:true,
            min:0,
            max:1000
        },
        markers: {
            showNullDataPoints:false
        },
        stroked:{            
            curve:"smooth"
        },
        dataLabels:{enabled:false}
      }


    return (
        <Chart options={options} series={series} type="line" width={330} height={200}/>
    );
}

