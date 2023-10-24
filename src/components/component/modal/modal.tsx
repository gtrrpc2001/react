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


interface ModalDefaultType {
    open:boolean
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }

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

    const closeModal = () => {
      setModalOpen(false);     
    }; 

  const mainBoxstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350, 
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

    return (    
        <div>
          <UiModal
            open={open}            
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={mainBoxstyle}>

              <ModalHeader />        

              <ModalTopBody bpm={modalList.bpm} arrCnt={modalList.arrCnt} HeartText={getHeartText(modalList.arrCnt)} />
              
              <Box>
                <Typography id="body" sx={{ mt: 2 }}>
                  {children}
                </Typography>
              </Box>
            </Box>
          </UiModal>
        </div>
    );

  }