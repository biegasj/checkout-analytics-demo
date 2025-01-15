import { useState } from "react";
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { getCartWithRelated } from "~/queries/cartQueries";
import DeliveryAddressForm from "~/components/checkout/DeliveryAddressForm";
import ShippingMethodForm from "~/components/checkout/ShippingMethodForm";
import CartSummary from "~/components/cart/CartSummary";
import { SHIPPING_METHODS, ShippingMethod } from "~/utils/shippingMethods";
import { PAYMENT_METHODS } from "~/utils/paymentMethods";
import PaymentMethodForm from "~/components/checkout/PaymentMethodForm";
import { createOrder } from "~/queries/orderQueries";
import { destroySession, getSession } from "~/sessions";
import {
  extractAddressDetails,
  validateAddressForm,
} from "~/routes/checkout.$sessionId/form";
import { AddressDetails } from "~/types/addressDetails";
import { useSubtotal } from "~/hooks/useSubtotal";
import { useSelectedShippingMethod } from "~/hooks/useSelectedShippingMethod";

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

  return cart;
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const session = await getSession(request.headers.get("Cookie"));
  const sessionId = String(formData.get("sessionId"));
  if (!sessionId) {
    throw new Response("Session ID is required", { status: 400 });
  }

  const errors = validateAddressForm(formData);
  if (errors) {
    return { errors };
  }

  const cart = await getCartWithRelated(sessionId);
  if (!cart) {
    throw new Response("Cart not found", { status: 404 });
  }

  const addressDetails: AddressDetails = extractAddressDetails(formData);
  await createOrder(cart.id, addressDetails);

  return redirect(`/order-confirmation/${sessionId}`, {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Checkout() {
  const cart = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [shippingMethodId, setShippingMethodId] = useState<string>(
    SHIPPING_METHODS[0].id
  );
  const [paymentMethodId, setPaymentMethodId] = useState<string>(
    PAYMENT_METHODS[0].id
  );

  const subtotal: number = useSubtotal(cart);
  const selectedShippingMethod: ShippingMethod | undefined =
    useSelectedShippingMethod(shippingMethodId);
  const shippingPrice: number = selectedShippingMethod?.cost ?? 0;

  return (
    <div className="container mx-auto max-w-screen-xl p-8 xl:mt-4 xl:mb-8">
      <div className="grid grid-flow-col gap-20 ">
        <div className="col-span-3 divide-y">
          <header className="pb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Checkout
            </h1>
          </header>

          <Form method="post" className="xl:pt-8">
            <div className="space-y-12">
              <DeliveryAddressForm errors={actionData?.errors} />
              <ShippingMethodForm
                selectedMethodId={shippingMethodId}
                onChange={setShippingMethodId}
              />
              <PaymentMethodForm
                selectedMethodId={paymentMethodId}
                onChange={setPaymentMethodId}
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Submit order
              </button>
            </div>

            <input type="hidden" name="sessionId" value={cart.sessionId} />
            <input type="hidden" name="shippingPrice" value={shippingPrice} />
          </Form>
        </div>
        <CartSummary
          cart={cart}
          subtotal={subtotal}
          shippingPrice={shippingPrice}
        />
      </div>
    </div>
  );
}
