/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatOrderDate } from "@/lib/formatDate";
import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link";
import { getCustomerProfile } from "@/app/data/order/getCustomerProfile";

export default async function OrdersPage() {
  const data = await getCustomerProfile();
  const allOrders = data.customer.orders;

  if (allOrders.edges.length === 0) {
    return (
      <div className=" flex flex-col mt-20 w-full">
        <h1>You haven&apos;t placed any orders yet.</h1>
        <Link
          href="/collections/handbags"
          className="flex items-center my-6 text-sm hover:font-bold"
        >
          Start Shopping <HiArrowSmRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-8 text-sm">
      <div className="grid grid-cols-5 font-semibold border-b pb-2">
        <div>Orders</div>
        <div>Date</div>
        <div>Status</div>
        <div>Total</div>
      </div>
      {/* orders */}

      <div className="">
        {allOrders.edges.map((order: any) => (
          <div
            key={order.node.id}
            className="grid grid-cols-5 text-xs border-b items-center py-4"
          >
            <Link
              href={{
                pathname: "/account/order-details",
                query: { orderNo: order.node.name },
              }}
              className="underline"
            >
              {order.node.name}
            </Link>
            <div>{formatOrderDate(order.node.processedAt)}</div>
            <div>
              {order.node.fulfillmentStatus
                ? order.node.fulfillmentStatus.charAt(0).toUpperCase() +
                  order.node.fulfillmentStatus.slice(1)
                : "Pending"}
            </div>
            <div>CA${order.node.totalPrice.amount}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
