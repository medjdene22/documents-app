import { VerifyForm } from "@/components/auth/verify-form";
import { Suspense } from "react";



export default function verify() {
  return (
    <Suspense><VerifyForm/></Suspense>    
  );
}
