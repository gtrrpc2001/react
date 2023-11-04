import {Box, Button, Typography} from "@mui/material";
import { ButtonChartBpm } from "../body/bodygraph/ChartButton";
import { useState } from "react";
import { getTime } from "../../../../func/func";

export const Writetime = () => {
    const [text,setText] = useState(getTime(false))
    const [disabled,setDisabled] = useState(true)
    const [count,setCount] = useState<number>(0)

    const writetimeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // const id = e?.currentTarget?.id
        // if(id == "plus"){
        //     if(text != getTime(false)){
        //         //setText()
        //         setDisabled(false)
        //     }else{
        //         setDisabled(true)
        //     }
        // }else{
        //     count
        //     getTime(false,true,count)

        // }
    }

    return (
        <Box sx={{height:40 , display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ButtonChartBpm id="minus"  bgColor="#a8a7a7" Handler={(e)=>writetimeHandler(e)} front={false}/>            
            <Typography sx={{fontWeight:'bold',marginLeft:7,marginRight:7}}>
                {text}
            </Typography>            
            <ButtonChartBpm id="plus" disabled={disabled} bgColor="#a8a7a7" Handler={(e)=>writetimeHandler(e)} front={true}/>            
        </Box>        
    );
}