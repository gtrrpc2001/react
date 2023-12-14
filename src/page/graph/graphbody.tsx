import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UserList } from "./userList";
import { GraphDatePicker } from "./datepicker";
import { getGraphBpmHrvArrData, getGraphEcgValue, getTest } from "../../data/graph";
import { Graphs } from "./graphBpmHrvArr";
import { GraphKindButton } from "./graphDataKindButton";
import { graphKindButton } from "../../axios/interface/graph";
import { getCalendarTime, getWritetimeSelectHour_Min } from "../../func/func";
import { calculMin, calculTime, getClickGraphKindButton } from "../../components/component/modal/controller/modalController";
import { getCalStep } from "../../components/component/modal/data/data";

type Props = {
    names:{eq:string,eqname:string}[]
    marginTop:number
}

export const GraphBody = ({names,marginTop}:Props) => {
    const [list,setList] = useState<{eq:string,eqname:string}[]>([])
    const [id,setId] = useState<string>('')
    const [data,setData] = useState<any[]>([])
    const [kindButton,setKindButton] = useState<graphKindButton>({bpm_hrv_arr:true,cal_step:false,ecg:false})
    const [writetime,setWritetime] = useState<string>('')
    const [ecgTime,setEcgTime] = useState<string>('')    
    const [open,setOpen] = useState<boolean>(true)
    
    useEffect(()=>{
        setList(names)
    },[names])
    
    const getCheckMaxValue = (value:number):number => {
        return (value > 180) ? 180 : value
    }

    async function getData(id:string,time:string,kindButton:graphKindButton,setData:React.Dispatch<React.SetStateAction<any[]>>)
    {
        try{
            if(id != '' && time != ''){
                let result
                let v:any[] = []
                const calTime = calculTime(time,1)                              
                switch(true){
                    case kindButton.ecg :
                        setEcgTime('')
                        break;
                    case kindButton.cal_step :
                        result = await getCalStep(id,time,calTime[1],13)
                        v = result?.map((d)=>{
                            return {step:d.step,distanceKM:d.distanceKM,cal:d.cal,calexe:d.calexe,
                                writetime:d.writetime
                            }
                        })
                        break;
                    default :                                                
                        result = await getGraphBpmHrvArrData(id,time,calTime)                        
                        v = result?.map((d)=>{
                             return {bpm:getCheckMaxValue(d.bpm),hrv:getCheckMaxValue(d.hrv),arr:d.count,writetime:getWritetimeSelectHour_Min(d.writetime)}
                         })
                        break;

                }
                setOpen(true)
                setData(v)                
            }
        }catch{

        }
    }

    const getEcgNumArr = (changeEcg:number[],ecgpacket:string) => {                  
          const after = ecgpacket?.replaceAll(';','')                                
          after?.split('][')?.forEach((data:string) => {
                  const sliceEcg = data?.replaceAll('[','')?.replaceAll(']','')?.split(',')
                  sliceEcg.forEach(d => {                            
                  changeEcg.push(Number(d))
                  
              })          
        })        
    }

    const getMinSecond = (writetime:string):string => {
        const hourMinSec = writetime?.split(' ')[1]
        const MinSec = hourMinSec?.split(':')
        return `${MinSec[1]}:${MinSec[2]}`
    }

    useEffect(()=>{       
        getData(id,writetime,kindButton,setData)
    },[id,writetime,kindButton])

    useEffect(()=>{  
        async function getEcgData(){
            if(ecgTime != ''){               
                const startTime = `${writetime} ${ecgTime}`
                const endTime = calculMin(startTime,10)
                const result = await getGraphEcgValue(id,startTime,endTime)                
                const v = result?.map((d)=>{
                    return {ecg:d}
                })  
                
            //     const result = await getTest(id,startTime,endTime)       
            //     let getEcgArr:number[] = []
            //     let getTime:string[] = []
            //     let i = 0        
            //     let index = 0
            //     let time = ""
            //     result?.forEach(d => {
            //         getEcgNumArr(getEcgArr,d.ecgpacket)                    
            //         getTime.push(getMinSecond(d.writetime))                  
            //     })
            //    const v = getEcgArr?.map(d => {
            //         if(i == 140)
            //             i = 0
            //         let va:{ecg:number,writetime:string}
            //         if(i == 0){
            //             time = getTime[index]    
                                            
            //             index++
            //             va = {ecg:d,writetime:time}
            //         }else{
            //             //  time = "0"    
            //             va = {ecg:d,writetime:""}                    
            //         }                    
            //         i++ 
            //         return va
                    
            //     }) 
                console.log(v)               
                setData(v)
                setOpen(true)
            } 
        }
        getEcgData();
    },[ecgTime])

    const handler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
        const nowId = e.currentTarget.id               
        setId(nowId)
    }

    const pickerChange = (value:any) => {
        const currentTime = getCalendarTime(value)
        setWritetime(currentTime)
    }

    const ButtonHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e?.currentTarget?.id    
        let iconClick:graphKindButton = getClickGraphKindButton(id) 
        setKindButton(iconClick)       
        setOpen(false)
    }
    
    const ecgTimeListHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const nowId = e.currentTarget.id
        console.log(nowId)
        setEcgTime(nowId)
        setOpen(false)
    }

    return (
        <Box sx={{display:'flex',alignItems:'center',marginTop:marginTop}}>
            <UserList nameList={list} handler={handler} id={id} width={300} height={400}/>   
            <Box>
                <Box sx={{paddingLeft:5,paddingBottom:2,display:'flex',alignItems:'center'}}>                            
                    <GraphDatePicker onChange={pickerChange}  width={170} height={50} />
                    <GraphKindButton onClick={ButtonHandler} onEcgTimeClick={ecgTimeListHandler} id={ecgTime} eq={id} time={writetime} kindButton={kindButton} fristItemWidth={230}/>                            
                </Box>
                {open ? (
                        <Graphs data={data} width={1300} height={340} kind={kindButton}/>          
                    ) : (
                    <Box sx={{display:'flex',width:1300, height:350,justifyContent:'center',alignItems:'center'}}>
                        <Box sx={{textAlign:'center'}}>
                            <CircularProgress color="primary"/>                        
                            <Typography>
                                {'약5초 기다려 주세요!.'}
                            </Typography>
                        </Box>
                    </Box>             
                    )}
            </Box>
        </Box>
    );
}
