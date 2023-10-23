import React, { PropsWithChildren, useEffect, useRef } from "react";
import UiModal from '@mui/material/Modal';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { historyLast } from "../../../axios/interface/history_last";


interface ModalDefaultType {
    open:boolean
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }
////
  export const Modal = ({open,setModalOpen,children}:PropsWithChildren<ModalDefaultType>) =>{   
    const values = useSelector<RootState,any>(state => state.cellValues)
    const data:historyLast[] = useSelector<RootState,any>(state => state.historylast)

   const getBpm = ():number => {
    let bpm:number = 0
    for (var i = 0 ; i < data?.length; i++){
      if(data[i].eq == values.eq){
        bpm = data[i].bpm
        break;
      }
    } 
    return bpm ;
   }

   

    const closeModal = () => {
      setModalOpen(false);     
    }; 

  const mainBoxstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800, 
    height:800,   
    bgcolor: 'background.paper',
    border: 5,
    spacing:0, 
    borderRadius:12,   
    boxShadow: 24,
    paddingInline:0,
    paddingBlock:0,
    display:'absolute',
  };  

  const headerBox = {
    display:'flex',
    alignItems:'end'
  }

  const logoStyle = {
    width:130,
    paddingBlockStart:3,
    paddingInlineStart:3
  }

  const topBodyStyle = {
    display:'flex',
    height:'17%',
    alignItems:'center',
    width:'100%'
  }
    

    return (    
        <div>
          <UiModal
            open={open}            
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={mainBoxstyle}>
              <Box sx={headerBox}>
                <Box sx={{display:'flex',alignItems:'center',position:'relative'}}>                  
                  <Typography sx={logoStyle} id="title" variant="h6" component="h2">
                    LOOKHEART
                  </Typography>
                </Box>
                <Box sx={{width:'80%',display:'flex', alignItems:'center',
                justifyContent: 'end',paddingBlockEnd:1,paddingInlineEnd:3}}> 
                  <BatteryCharging50Icon sx={{transform:'rotate(90deg)'}}/>                
                </Box>
              </Box>                            
              <Box sx={topBodyStyle}>
                <Box sx={{display:'flex'}}>                                       
                    <Box 
                      sx={{display:'inline-block',width:150,height:70,pb:2,
                      bgcolor:'white',border:3,borderRadius:5,borderColor:'#5388F7',
                      verticalAlign:'middle',marginLeft:1,textAlign:'center'}} >
                        <Typography 
                          sx={{fontFamily:'-moz-initial',fontSize:24,color:'#5388F7',
                          fontWeight:'bold',marginBlockStart:3}} 
                          id="bpm" variant="h5" component="h5">
                          {getBpm()}
                        </Typography>
                    </Box>
                    <Box sx={{position:'absolute',top:67,left:75,}}>
                      <FavoriteIcon sx={{color:'#5388F7'}} fontSize="medium"/>
                      
                    </Box>
                </Box>
                <Typography id="body" sx={{ mt: 2 }}>
                  {children}
                </Typography>
              </Box>
            </Box>
            </UiModal>
        </div>
    );

  }