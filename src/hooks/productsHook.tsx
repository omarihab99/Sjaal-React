import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";


export const productsDispatch =useDispatch.withTypes<AppDispatch>();
export const productsSelector =useSelector.withTypes<RootState>();