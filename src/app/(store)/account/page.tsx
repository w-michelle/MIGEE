import { getAuthToken } from "@/lib/cookies";
import { shopifyFetch } from "@/lib/shopify";
import { redirect } from "next/navigation";

import AccountView from "./component/account-view";

// orders(first: 20) {
//     edges {
//         node {
//             name
//             processedAt
//             totalPriceSet { shopMoney {amount currencyCode } }
//         }
//     }
// }

const CUSTOMER_QUERY = `
query getCustomer($token: String!) {
    customer(customerAccessToken: $token) {
        email
        firstName
        lastName
       
    }
}
`;

export default async function AccountPage() {
  const token = await getAuthToken();

  if (!token) {
    redirect("/account/login");
  }

  const { data } = await shopifyFetch(CUSTOMER_QUERY, {
    token,
  });

  const customer = data?.customer;

  if (!customer) {
    redirect("/account/login");
  }
  console.log("customer", customer);

  return (
    <div>
      <AccountView customer={customer} />
    </div>
  );
}
