import {configureStore} from '@reduxjs/toolkit';
import {eqSlice,listSlice,loadingSlice,loginSlice} from '../components/createslice/createslices';

export const store = configureStore({
    reducer:{
        loading:loadingSlice.reducer,
        check: loginSlice.reducer,
        eq: eqSlice.reducer,
        historylast:listSlice.reducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;