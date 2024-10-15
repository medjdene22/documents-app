import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";



export default function NewPassword() {
  return (
    <Suspense>
          <NewPasswordForm/>
    </Suspense>
  );
}
