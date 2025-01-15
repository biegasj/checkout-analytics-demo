import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCartWithRelated } from "~/queries/cartQueries";
import { getOrderWithRelated } from "~/queries/orderQueries";
import OrderSummary from "~/components/order/OrderSummary";
import { DetailItem } from "~/components/order/DetailItem";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const sessionId = params.sessionId;
  if (!sessionId) {
    throw new Response("Session ID is required", { status: 400 });
  }

  const cart = await getCartWithRelated(sessionId);
  if (!cart) {
    throw new Response("Cart not found", { status: 404 });
  }

  const order = await getOrderWithRelated(cart.id);

  return { cart, order };
};

export default function OrderConfirmation() {
  const { cart, order } = useLoaderData<typeof loader>();

  const details = [
    { label: "Email address", value: order.email },
    { label: "Full name", value: `${order.firstName} ${order.lastName}` },
    { label: "Address", value: order.address },
    { label: "Shipping method", value: order.shippingMethod },
    { label: "Payment method", value: order.paymentMethod },
  ];

  return (
    <div className="container mx-auto max-w-screen-xl p-8 xl:mt-4 xl:mb-8">
      <div className="grid grid-flow-col gap-20 ">
        <div className="col-span-3 divide-y">
          <header className="pb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Thank you for your order!
            </h1>
          </header>
          <div className="px-4 py-8 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">
              Personal details summary
            </h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              Personal details, selected shipping and payment methods.
            </p>
          </div>
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {details.map((detail, index) => (
                <DetailItem
                  key={index}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </dl>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to="/">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Return to home page
                </button>
              </Link>
            </div>
          </div>
        </div>
        <OrderSummary cart={cart} order={order} />
      </div>
    </div>
  );
}
