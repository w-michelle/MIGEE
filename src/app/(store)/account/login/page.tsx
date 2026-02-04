import { getAuthToken } from "@/lib/cookies";
import SignInView from "../component/signin-view";
import { redirect } from "next/navigation";

async function Login() {
  const token = await getAuthToken();

  if (token) {
    redirect("/account");
  }
  return (
    <main className="w-full md:w-1/2 mt-6 mx-auto">
      <SignInView />
    </main>
  );
}

export default Login;
