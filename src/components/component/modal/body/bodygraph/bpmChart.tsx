import { Box,Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { graphBpm } from "../../../../../axios/interface/graphModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

type Props = {
    eq:string
}

export const BpmChart = ({eq}:Props) => {
    let [Count ,setCount] = useState<number>(1)
    const [backBtn,setBackBtn] = useState<boolean>(false)
    const [nextBtn,setNextBtn] = useState<boolean>(false)
    const data:graphBpm[] = useSelector<RootState,any>(state => state.bpmGraphValue) 
    const length = data.length
    
    const graphShow = ():number[] => {
        if(Count == 1){
            return [1, 50]         
        } else {
            if(Count * 50 > length){
                return [((Count-1) * 50) + 1, length]
            }else{
                return [((Count-1) * 50) + 1, Count * 50]
            }
        }
    }
    const [slice,setSlice] = useState<number[]>(graphShow())
       
    let start = slice[0]
    let end = slice[1]

    const bpms = data?.slice(start,end)?.map(d=>d.bpm)
    const writetimes = data?.slice(start,end)?.map(d=> (d.writetime.split(' ')[1]))

    const series:ApexAxisChartSeries = [
        {
          name: "ecgData",
          data: bpms,
          
        }
      ]      
      
    const options:ApexOptions = {
        chart: {
          id: "realtime",  
          toolbar:{
            show:true,          
          },
          zoom:{
            enabled:true,
          } ,             
        },      
        xaxis: {
          categories:writetimes,
          tooltip:{enabled:true},          
          range:50,        
          tickPlacement: 'between',
          labels:{
            show:true,
            rotate:-45,
            rotateAlways: false, 
            hideOverlappingLabels: true,
            showDuplicates: false,
        }
        },      
        yaxis:{
            show:true,
            min:0,
            max:180
        },        
        markers: {
            showNullDataPoints:false
        },
        stroke:{            
            curve:"smooth"
        },
        dataLabels:{enabled:false},
        grid: { show: true },
        theme: { mode: "light" },
      }   
    
    function countHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
       if(e.currentTarget.id == "plus"){
            if(((Count-1) * 50) + 1 > length){
                setNextBtn(true)
            }else{
                setCount(Count+1)
            }
        }
        else{
            if(Count > 1)
                setCount(Count-1)
            else if(Count == 1){
                setBackBtn(true)
            }
        }
    }    

    useEffect(()=>{
        setSlice(graphShow())
    },[Count])

    return (
        <Box>
            <Chart options={options} series={series} type="line" width={330} height={300}/>
            <Button id="minus" sx={{":hover":{cursor: backBtn? 'default':'pointer'}}} disabled={backBtn} onClick={(e)=>countHandler(e)}> {'<-'} </Button>
            <Button id="plus" sx={{":hover":{cursor: nextBtn? 'default':'pointer'}}} disabled={nextBtn} onClick={(e)=>countHandler(e)}> {'->'} </Button>
        </Box>
    );
}