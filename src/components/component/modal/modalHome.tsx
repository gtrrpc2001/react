import { Box } from "@mui/material";
import { ModalHeader } from "./header/modalHeader";
import { ModalTopBody } from "./topbody/modalTopbody";
import { MiddleBody } from "./middlebody/middleBody";
import { ModalRealTimeGraph } from "../../../page/graph/modalGraph";
import { BottomBody } from "./component/bottomBody";
import { Footer } from "./footer/footer";
import { getDecimal, getHeartText } from "./controller/modalController";
import { modalValues } from "../../../axios/interface/modalvalues";
import { getProfile } from "../../../axios/api/serverApi";
import { profileModal } from "../../../axios/interface/profileModal";

type Props = {
    modalList: modalValues
    values:any
    getProfile:profileModal
}

export const ModalHome = ({modalList,values,getProfile}:Props) => {
    
    return (
            <>
              

              <ModalTopBody bpm={modalList.bpm} arrCnt={modalList.arrCnt} prevArrCnt={getProfile.arrCnt} HeartText={getHeartText(modalList.arrCnt)} />
              
              <MiddleBody 
              bpm={modalList.bpm} 
              arrCnt={modalList.arrCnt} 
              sleepTime = {getProfile.설정_수면시작} 
              upTime={getProfile.설정_수면종료}
              settingBpm={getProfile.설정_활동BPM}
              />              
              
              <Box>                
                <ModalRealTimeGraph bpm={modalList.bpm} eq={values.eq} time={modalList.writetime} height={280} />
              </Box>

              <BottomBody actCal={modalList.actCal} step={modalList.step} temp={modalList.temp} distance={getDecimal(modalList.distance)}/>
            
              
            </>
              
            
    );
}