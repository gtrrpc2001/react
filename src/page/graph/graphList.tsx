import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getGraphBpmHrvArrData } from "../../data/graph";
import { getTime } from "../../func/func";

type Props = {
    names:{eq:string,eqname:string}[]
}

export const GraphList = ({names}:Props) => {
    const [list,setList] = useState<{eq:string,eqname:string}[]>([])
    const [id,setId] = useState<string>('')
    const [data,setData] = useState<{bpm:number,hrv:number,arr:number,time:string}[]>([])
    useEffect(()=>{
        setList(names)
    },[names])

    useEffect(()=>{
       async function getData(){
        if(id != ''){
            const result = await getGraphBpmHrvArrData(id,`${getTime(false)} 00:00:00`)                        
                let v = result?.map(d=>{
                     return {bpm:d.bpm,hrv:d.hrv,arr:d.count,time:d.writetime}
                 })
                 setData(v)
            
        }
    }
        getData()
    },[id])

    const selectedColor = (eq:string,box=false) => `${(id == eq) ? '#5388F7' : (box ? "black" :'#c3c1c1')}`

    const handler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
        const nowId = e.currentTarget.id       
        
        setId(nowId)
    }    

    const itemes = () =>{
        try{
            return (
                list?.map((name,index)=>{
                    const {eq,eqname} = name                    
                    return (
                        <ListItem className="listItem" id={eq} onClick={(e)=>handler(e)}>

                        <ListItemButton sx={{padding:0}}>                    
                            <ListItemIcon>
                                <Box sx={{width:45,height:40,borderRadius:3,bgcolor:selectedColor(eq,true),
                                display:'flex',justifyContent:'center',alignItems:'center',
                                ":hover":{cursor:'default'}}}>
                                    <Typography sx={{color:'white'}}>
                                        {index + 1}    
                                    </Typography>                            
                                </Box>                        
                            </ListItemIcon>
                            <ListItemText className="text" sx={{display:'flex',justifyContent:'center',alignItems:'center',
                            border:1,borderRadius:3,borderColor:selectedColor(eq),height:40,":hover":{cursor:'pointer'},
                            }} 
                            primary={eqname}/> 
                        </ListItemButton>
                        </ListItem>
                    );
                })
            );
        }catch{

        }
    }

    return (
        <Box sx={{width:1652,height:1060,display:'flex',alignItems:'center'}}>
            <List sx={{width:300,maxHeight:500,overflow:'auto',}}>
                {itemes()}    
            </List>            
            <ComposedChart
            width={1300}
            height={400}
            data={data}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="time" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="bpm" stroke="#ff7300" dot={false}/>
                <Line yAxisId="left" type="monotone" dataKey="hrv" stroke="#8884d8" dot={false}/>
                <Bar yAxisId="right" dataKey="arr" barSize={300} fill="#ef507b"/>
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" domain={[0,1]} orientation="right"/>
            </ComposedChart>
            
        </Box>
    );
}