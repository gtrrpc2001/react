import {PayloadAction, createSlice} from '@reduxjs/toolkit';


export const loadingSlice = createSlice({
    name:'loading',
    initialState:true,
    reducers:{  
        loginCheck: (state,action: PayloadAction<boolean>) => state = action.payload,
      
    },
});
export const loadingActions = loadingSlice.actions;

export const loginSlice = createSlice({
    name:'login',
    initialState:false,
    reducers:{  
        loginCheck: (state,action: PayloadAction<boolean>) => state = action.payload,
      
    },
});

export const loginActions = loginSlice.actions;

export const eqSlice = createSlice({
    name:'eq',
    initialState:'',
    reducers:{
        eq :(state:string,action: PayloadAction<string>) => state = action.payload,
    }

});
export const eqActions = eqSlice.actions;

export const listSlice = createSlice({
    name:'history_last',
    initialState:[],
    reducers:{
        listHistory:(state:any,action: PayloadAction<any>) => state = action.payload,
    }

});
export const listActions = listSlice.actions;