/* eslint-disable @typescript-eslint/no-explicit-any */
import getSingleOrder from "@/app/data/order/getSingleOrder";
import { formatOrderDate } from "@/lib/formatDate";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";

async function OrderDetails({
  searchParams,
}: {
  searchParams: { orderNo?: string };
}) {
  const { orderNo } = await searchParams;

  if (!orderNo) {
    return <div>Order not found</div>;
  }

  const order = await getSingleOrder(orderNo);
  console.log("SINGLE ORDER", order);

  return (
    <div className="w-full text-xs space-y-4 px-6 py-8">
      <div className="w-1/3 space-y-3">
        <h2 className="text-lg">Order No. {order.name}</h2>
        <div className="grid grid-cols-2">
          <div>
            <p>Order Status</p>
          </div>
          <div>
            <p>
              {order.fulfillment_status
                ? order.fulfillment_status.charAt(0).toUpperCase() +
                  order.fulfillment_status.slice(1)
                : "Pending"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p>Order Date</p>
          </div>
          <div>
            <p>{formatOrderDate(order.created_at)}</p>
          </div>
        </div>

        {order.fulfillments.length >= 1 && (
          <div className="grid grid-cols-2">
            <div>
              <p>Tracking No.</p>
            </div>
            <div>
              <a
                href={order.fulfillments[0].tracking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {order.fulfillments[0].tracking_number}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ITEMS */}
      <div className="flex flex-col gap-4 border-red-200 border w-full py-8">
        {order.line_items.map((item: any) => (
          <div
            key={item.id}
            className="flex"
          >
            <div className="relative w-[140px] h-[200px] mr-5 ">
              <Image
                src={
                  item.image
                    ? imageUrl(item.image).url()
                    : "/productDefault.png"
                }
                alt="Product"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 w-full">
              <div className="w-full grid grid-cols-3 gap-4">
                <p>{item.title}</p>
                <p>
                  {item.quantity} x ${item.price}
                </p>
                <p>${item.quantity * item.price}</p>
              </div>
              <div>
                <p>{item.variant_title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
