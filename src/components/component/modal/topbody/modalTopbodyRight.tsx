import Box from '@mui/material/Box';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import { useSelector } from "react-redux";
import { RootState } from '../../../../store/store';
import './modalTopbodyRight.scss'
import { ModalTopbodyRightText } from './modalTopbodyRightText';

type Props = {
    ArrCnt:number
    HeartText:string
}

const color = '#ef507b'
const position = 'absolute'

export const ModalTopBodyRight = ({ArrCnt,HeartText}:Props) =>{

    const getPrevArrCnt = useSelector<RootState,any>(state => state.arrCnt)[0]
    const {arrCnt} = getPrevArrCnt
    const prevArrCnt:number = arrCnt
    let minusArrCnt = (prevArrCnt < ArrCnt) ? (ArrCnt - prevArrCnt) : (prevArrCnt - ArrCnt)
    let compareArrChecked = (prevArrCnt > ArrCnt) ? true : false       
    return (
        <Box sx={{display:'flex',width:177,justifyContent:'flex-end'}}>
                  
            <Box 
                sx={{display:'inline-block',width:150,height:70,pb:2,
                bgcolor:'white',border:3,borderRadius:5,borderColor:color,
                verticalAlign:'middle',marginLeft:1,textAlign:'center'}} >
                        
                <div className="heart"/>
                <Box sx={{position:position,fontSize:24,fontWeight:'regular',color:'white',
                    top:103 ,right:120}}>{HeartText}
                </Box>

               <ModalTopbodyRightText 
               ArrCnt={minusArrCnt} 
               compareArrChecked={compareArrChecked} 
               position={position}/>
                
            </Box>
            <Box sx={{position:position,top:63,left:248,}}>
                <HeartBrokenOutlinedIcon sx={{color:color}} fontSize="large"/>                      
            </Box>
        </Box>
    );
}