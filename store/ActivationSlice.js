import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    name : '',
    avatar : '',
    special: false
    
}

export const activationSlice = createSlice({
    name: 'activation',
    initialState,

    reducers: {
        setName : (state , action)=>{
            state.name =  action.payload; 
        },

        setAvatar : (state , action) => {
            state.avatar = action.payload;
        },

        setSpecial : (state , action)=>{
        state.special = action.payload
        }


    },


})

// Action creators are generated for each case reducer function
export const { setName , setAvatar, setSpecial } = activationSlice.actions


export default activationSlice.reducer