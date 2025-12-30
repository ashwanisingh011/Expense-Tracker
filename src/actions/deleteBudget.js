import { toast } from "react-toastify";
import { deleteBudgetApi } from "../helper";
import { redirect } from "react-router-dom";

export async function deleteBudget({ params }) {
  try {
    await deleteBudgetApi(params.id);
    toast.success("Budget deleted successfully!");
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
}
