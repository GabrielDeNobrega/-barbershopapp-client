import { toast } from "react-toastify"
import { Error } from "../models/Error";

export const convertToToastError=({message, statusCode}: Error )=>{
    const toasts = statusCode < 500 && statusCode >= 400 ?  toast.warn :  toast.error;
    toasts(message);
}