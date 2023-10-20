import React, { PropsWithChildren, useEffect, useRef } from "react";
import UiModal from '@mui/material/Modal';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ModalDefaultType {
    open:boolean
    values:any
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }
////
  export const Modal = ({open,values,setModalOpen,children}:PropsWithChildren<ModalDefaultType>) =>{   

    const closeModal = () => {
      setModalOpen(false);     
    };   

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200, 
    height:600,   
    bgcolor: 'background.paper',
    border: 'none',
    
    boxShadow: 24,
    p: 4,
  };
    const {eq} = values

    return (    
        <div>
          <UiModal
            open={open}            
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="title" variant="h6" component="h2">
                title
              </Typography>
              <Typography id="body" sx={{ mt: 2 }}>
                {children}
              </Typography>
            </Box>
            </UiModal>
        </div>
    );

  }