import { CardWarrper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export default function AuthError() {
  return (
    <CardWarrper  headerLabel={"Oops! something went wrong!"} backButtonLabel={"Back to login"} backButtonHerf={"/auth/login"}>
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive w-12 h-12" />
      </div>
    </CardWarrper>
  );
}
