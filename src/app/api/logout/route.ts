import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();

  //remove customeraccesstoken
  cookieStore.delete("customerAccessToken");

  //remove cart
  cookieStore.delete("cartId");

  //redirect to homepage
  revalidatePath("/");
  return redirect("/");
}
