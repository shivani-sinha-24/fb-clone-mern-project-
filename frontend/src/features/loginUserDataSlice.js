import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    fName: '',
    lName: '',
    email: '',
    date: '',
    month: '',
    year: '',
    gender: '',
    posts:''
}

export const loginUserDataSlice =createSlice({
    name:'loginUserData',
    initialState,
    reducers:{
        addLoginUserData:{
            reducer(state,action){
                const newState = {
                    _id:action.payload._id,
                    fName: action.payload.fName,
                    lName: action.payload.lName,
                    email: action.payload.email,
                    date: action.payload.date,
                    month: action.payload.month,
                    year: action.payload.year,
                    gender: action.payload.gender,
                    posts:action.payload.posts
                }
                return newState;
            },
            prepare(_id,fName,lName,email,date,month,year,posts,gender){
                return{
                    payload:{
                        _id,
                        fName,
                        lName,
                        email,
                        date,
                        month,
                        year,
                        posts,
                        gender
                    }
                }
            }
        },
        resetLoginUserData:(state,action)=>{
            const newState = {}
            return newState
        }
    }
}) 

export const {addLoginUserData,resetLoginUserData} = loginUserDataSlice.actions

export default loginUserDataSlice.reducer