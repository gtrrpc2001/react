import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';

type Props = {
    arrCnt:number
    HeartText:string
}

const color = '#ef507b'
const position = 'absolute'

export const ModalTopBodyRight = ({arrCnt,HeartText}:Props) =>{
    return (
        <Box sx={{display:'flex',width:177,justifyContent:'flex-end'}}>
                  
            <Box 
                sx={{display:'inline-block',width:150,height:70,pb:2,
                bgcolor:'white',border:3,borderRadius:5,borderColor:color,
                verticalAlign:'middle',marginLeft:1,textAlign:'center'}} >
                        
                <div className="heart"/>
                <Box sx={{position:position,fontSize:24,fontWeight:'regular',color:'white',
                    top:103 ,right:117}}>{HeartText}
                </Box>

                <Typography 
                    sx={{fontFamily:'-moz-initial',fontSize:20,color:color,
                    fontWeight:'bold',marginBlockStart:3,position:position,right:17,top:84}} 
                    id="bpm" variant="h5" component="h5">                          
                    {arrCnt + '회 발생'} 
                </Typography>                        
            </Box>
            <Box sx={{position:position,top:63,left:248,}}>
                <HeartBrokenOutlinedIcon sx={{color:color}} fontSize="large"/>                      
            </Box>
        </Box>
    );
}