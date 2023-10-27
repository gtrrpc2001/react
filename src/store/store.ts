import {configureStore} from '@reduxjs/toolkit';
import {eqSlice,listSlice,cellSlice,loginSlice, arrCntSlice} from '../components/createslice/createslices';

export const store = configureStore({
    reducer:{
        check: loginSlice.reducer,
        eq: eqSlice.reducer,
        historylast:listSlice.reducer,
        cellValues:cellSlice.reducer,
        arrCnt:arrCntSlice.reducer,
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;