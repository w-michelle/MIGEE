/* eslint-disable @typescript-eslint/no-explicit-any */
import getCustomerOrders from "@/app/data/order/order";
import { formatOrderDate } from "@/lib/formatDate";
import Link from "next/link";

export default async function OrdersPage() {
  const allOrders = await getCustomerOrders();
  console.log("all orders", allOrders);
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
        {allOrders.orders.map((order: any) => (
          <div
            key={order.name}
            className="grid grid-cols-5 text-xs border-b items-center py-4"
          >
            <Link
              href={{
                pathname: "/account/order-details",
                query: { orderNo: order.name },
              }}
              className="underline"
            >
              {order.name}
            </Link>
            <div>{formatOrderDate(order.created_at)}</div>
            <div>
              {order.fulfillment_status
                ? order.fulfillment_status.charAt(0).toUpperCase() +
                  order.fulfillment_status.slice(1)
                : "Pending"}
            </div>
            <div>CA${order.current_total_price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
