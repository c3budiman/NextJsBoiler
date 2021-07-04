import { combineReducers } from "redux";
import dogReducer from "./dog";
import userReducer from './users'

//this thing combine reducers, so we dont have that messy one file.
export default combineReducers({ dogReducer, userReducer });
