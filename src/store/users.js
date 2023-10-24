import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async(obj,thunkAPI)=>{
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users/111`);
            return res.data;
        } catch(err){
            return err;
        }
    }
)


export const usersSlice = createSlice({
    name:'users',
    initialState:{
        type:'Guest',
        users:[],
        loading:false
    },
    reducers:{
        setType:(state,action)=>{
            state.type = action.payload || 'Guest'
        },
        testAsyncDispatch:(state)=>{
            state.test = true;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            console.log(action.payload);
        })
    }
});

export const { setType, testAsyncDispatch } = usersSlice.actions
export default usersSlice.reducer;