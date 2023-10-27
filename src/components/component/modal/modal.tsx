import React, { PropsWithChildren, useEffect, useState } from "react";
import UiModal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { historyLast } from "../../../axios/interface/history_last";
import './modal.scss'
import 'animate.css';
import { ModalHeader } from "./header/modalHeader";
import { ModalTopBody } from "./topbody/modalTopbody";
import { getHeartText, getValues } from "./controller/modalController";
import { MiddleBody } from "./middlebody/middleBody";
import { LineChart } from "@mui/x-charts";

import moment, { min } from 'moment';
import { getTime } from "../../../func/func";
import { getData } from "../../../axios/api/serverApi";
import { ModalRealTimeGraph } from "../../../page/graph/modalGraph";

interface ModalDefaultType {
    open:boolean
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }

  export const Modal = ({open,setModalOpen,children}:PropsWithChildren<ModalDefaultType>) =>{   
    const values = useSelector<RootState,any>(state => state.cellValues)
    const data:historyLast[] = useSelector<RootState,any>(state => state.historylast)     
    const modalList = getValues(data,values.eq)    
    const bpm = modalList.bpm
    const arrCnt = modalList.arrCnt
    const currentDate = new Date();
    const showDate = Number(moment(currentDate).format('ss'));
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

              <ModalTopBody bpm={bpm} arrCnt={arrCnt} HeartText={getHeartText(arrCnt)} />
              
              <MiddleBody bpm={bpm} arrCnt={arrCnt}/>
              
              
              <Box>                
                <ModalRealTimeGraph bpm={bpm} categories={[showDate]} eq={values.eq} time={modalList.writetime} />
              </Box>

              <Box>
                <Typography>
                  {children}
                </Typography>
              </Box>
            </Box>
          </UiModal>
        </div>
    );

  }