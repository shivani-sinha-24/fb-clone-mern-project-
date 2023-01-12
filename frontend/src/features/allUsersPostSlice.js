import { createSlice, CreateSlice } from "@reduxjs/toolkit";

const initialState = []

export const allusersPostSlice = createSlice({
    name:'allUsersPosts',
    initialState,
    reducers:{
        addAllUsersPosts:{
            reducer(state,action){
                // const newState = [action.payload]
                // return newState
                state.push(action.payload)
            },
            prepare(_id,userId,caption,image,date,likes,comments){
                return{
                    payload:{
                        _id,userId,caption,image,date,likes,comments
                    }
                }
            }
        },
        resetAllUsersPost:(state,action)=>{
            const newState = []
            return newState
        }
    }
})

export const {addAllUsersPosts,resetAllUsersPost} = allusersPostSlice.actions

export default allusersPostSlice.reducer