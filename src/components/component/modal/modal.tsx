<<<<<<< HEAD
import React, { PropsWithChildren } from "react";
import UiModal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { historyLast } from "../../../axios/interface/history_last";
import { modalValues } from "../../../axios/interface/modalvalues";
import './modal.scss'
import 'animate.css';
import { ModalHeader } from "./header/modalHeader";
import { ModalTopBody } from "./topbody/modalTopbody";
import { getHeartText } from "./controller/modalController";
=======
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
>>>>>>> f883ed62232427d2c1762862ebfc6a7510c8c4ac


interface ModalDefaultType {
    open:boolean
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }
<<<<<<< HEAD

  export const Modal = ({open,setModalOpen,children}:PropsWithChildren<ModalDefaultType>) =>{   
    const values = useSelector<RootState,any>(state => state.cellValues)
    const data:historyLast[] = useSelector<RootState,any>(state => state.historylast)
    
    const getValues = ():modalValues => {    
     let modalList:modalValues = {bpm:0,arrCnt:0,actCal:0,step:0,temp:0,distance:0}
     let row 
    for (var i = 0 ; i < data?.length; i++){
      if(data[i].eq == values.eq){
        row = data[i]
        modalList = {bpm:row.bpm,arrCnt:row.arrcnt,actCal:row.calexe,step:row.step,temp:row.temp,distance:row.distanceKM}             
        break;
      }
    }     
    return modalList;
   }

   const modalList = getValues()
=======
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

   
>>>>>>> f883ed62232427d2c1762862ebfc6a7510c8c4ac

    const closeModal = () => {
      setModalOpen(false);     
    }; 

  const mainBoxstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
<<<<<<< HEAD
    width: 350, 
=======
    width: 800, 
>>>>>>> f883ed62232427d2c1762862ebfc6a7510c8c4ac
    height:800,   
    bgcolor: 'background.paper',
    border: 5,
    spacing:0, 
    borderRadius:12,   
    boxShadow: 24,
    paddingInline:0,
    paddingBlock:0,
    display:'absolute',
<<<<<<< HEAD
  }; 

=======
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
    

>>>>>>> f883ed62232427d2c1762862ebfc6a7510c8c4ac
    return (    
        <div>
          <UiModal
            open={open}            
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={mainBoxstyle}>
<<<<<<< HEAD

              <ModalHeader />        

              <ModalTopBody bpm={modalList.bpm} arrCnt={modalList.arrCnt} HeartText={getHeartText(modalList.arrCnt)} />
              
              <Box>
=======
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
>>>>>>> f883ed62232427d2c1762862ebfc6a7510c8c4ac
                <Typography id="body" sx={{ mt: 2 }}>
                  {children}
                </Typography>
              </Box>
            </Box>
<<<<<<< HEAD
          </UiModal>
        </div>
    );

  }
=======
            </UiModal>
        </div>
    );

  }
>>>>>>> f883ed62232427d2c1762862ebfc6a7510c8c4ac
