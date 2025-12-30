// rrd imports
import { redirect } from "react-router-dom";
// helpers
// import { deleteItem } from "../helper";
// library imports
import { toast } from "react-toastify";
export async function logoutAction(){
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    toast.success("You have logged out successfully.");
    //return redirect
    return redirect("/")
}