import { ArrCntText } from "./arrCntText";
import { BpmType } from "./bpmType";
import Box from '@mui/material/Box';

type Props = {
    bpm:number
    arrCnt:number
}

export const MiddleBody = ({bpm,arrCnt}:Props) =>{
    return (
        <Box sx={{display:'flex'}}>
            <BpmType bpm={bpm}/>                

            <ArrCntText arrCnt={arrCnt}/>                
        </Box>
    );
}