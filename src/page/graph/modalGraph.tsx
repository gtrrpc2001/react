import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { getEcg } from "../../axios/api/serverApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalTimerActions } from "../../components/createslice/createslices";

type Porps = {
    bpm:number
    categories:number[]
    eq:string
    time:string
}

export const ModalRealTimeGraph = ({bpm,categories,eq,time}:Porps) => {  
    const [ecgData,setEcgData] = useState<number[]>([]);
    let updateData:number[] = []
    const dataRef = useRef<number[]>([]);    
    const series = [
      {
        name: "ecgData",
        data: ecgData?.slice(0,500),
        
      }
    ]      
    
  const options = {
      chart: {
        id: "realtime",
        animation:{
          enabled:true,
          easing:"linear",//"linear", 
                               
          dynamicAnimation:{
              enabled:true,
              speed:3000
          }
        },

        toolbar:{
          show:false
        },
        zoom:{
          enabled:false,
        } ,             
      }, 
      
           
      xaxis: {          
        //categories: categories,          
        rage:4000,
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
    
    useEffect(() => {
        const getEcgData = async() =>  {
            try{
                const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)
                
                result.forEach(num => {
                  updateData.push(num)
                })                                
                
                // const current = dataRef.current 
                // setEcgData(current)
                console.log(updateData.length)
               if(updateData.length>=500){
                 setEcgData(updateData)
                 updateData = []
               }
                
            }catch(E){
                console.log(E)
            }                      
        }
        
        const timer = setInterval(async()=>{          
           await getEcgData()            
            ApexCharts.exec('realtime', 'updateSeries', [{newSeries:series,animate:true},] )
        },500)

        return (() => clearTimeout(timer))
        
    },[bpm])    
     
      

      

    return (
        <Chart options={options} series={series} type="line" width={330} height={200}/>
    );
}

