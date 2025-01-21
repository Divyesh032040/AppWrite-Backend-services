import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth : false,
    user : null,
    otp : {
        phone : '',
        hash : '',
        email : ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setAuth : (state , action)=>{
                const { user } = action.payload;
                state.user = user;
                if(user === null){
                    state.isAuth = false;
                }else{
                    state.isAuth = true;
                }
                
        },

        setOtp : (state , action) => {
            
            state.otp.phone = action.payload.phone;
            state.otp.hash = action.payload.hash;
            state.otp.email = action.payload.email;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth , setOtp } = authSlice.actions


export default authSlice.reducer