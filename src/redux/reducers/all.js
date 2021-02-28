import { combineReducers } from "redux";
import dogReducer from "./dog";

//this thing combine reducers, so we dont have that messy one file.
export default combineReducers({ dogReducer });
