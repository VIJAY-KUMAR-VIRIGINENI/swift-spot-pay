import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService'




const user=JSON.parse(localStorage.getItem('user'));

const intialState = {   
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: intialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state,action)=>{  
            state.isLoading=true;
            
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.user =action.payload;

        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false;
            state.message=action.payload;
                      state.isError=true;
            state.user =null;

        })
        .addCase(login.pending,(state,action)=>{  
            state.isLoading=true;
            
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.user =action.payload;

        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.message=action.payload;
                      state.isError=true;
            state.user =null;

        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
    })

    }
});


//Register
export const register=createAsyncThunk(
    'auth/register',
    async (user,thunkAPI)=>{
        try{
            return await authService.register(user);
        }
        catch(error){
            const message=(error.message&&error.response.data.message&&error.response.data)||error.message||error.toString();
        return thunkAPI.rejectWithValue({message})
        }
})

//Login User

export const login=createAsyncThunk(
    'auth/login',
    async (user,thunkAPI)=>{
        try{
            return await authService.login(user);
        }
        catch(error){
            const message=(error.message&&error.response.data.message&&error.response.data)||error.message||error.toString();
        return thunkAPI.rejectWithValue({message})
        }
})

export const logout=createAsyncThunk(
    'auth/logout',
    async ()=>{
        await authService.logout();
       
})



export const { reset } = authSlice.actions;

export default authSlice.reducer;




    
    
