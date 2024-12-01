import { SCREENS } from "@/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(SCREENS.PRODUCT.DETAILS);
}
