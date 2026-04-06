import { redirect } from "next/navigation";

import AccountView from "./component/account-view";
import { getCustomerProfile } from "@/app/data/order/getCustomerProfile";

export default async function AccountPage() {
  const data = await getCustomerProfile();

  const customer = data?.customer;

  if (!customer) {
    redirect("/account/login");
  }

  return (
    <main className="w-full ">
      <AccountView customer={customer} />
    </main>
  );
}
