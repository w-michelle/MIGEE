import { getAuthToken } from "@/lib/cookies";
import SignInView from "../component/signin-view";
import { redirect } from "next/navigation";

async function Login() {
  const token = await getAuthToken();

  if (token) {
    redirect("/account");
  }
  return (
    <div className="w-full md:w-1/2 mt-6 mx-auto">
      <SignInView />
    </div>
  );
}

export default Login;
