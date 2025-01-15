import { SHIPPING_METHODS, ShippingMethod } from "~/utils/shippingMethods";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

interface ShippingMethodFormProps {
  selectedMethodId: string;
  onChange: (method: string) => void;
}

export default function ShippingMethodForm({
  selectedMethodId,
  onChange,
}: ShippingMethodFormProps) {
  return (
    <section>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Shipping method
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Select your preferred shipping method below. Your choice will be used
          to process the order.
        </p>
        <RadioGroup
          value={selectedMethodId}
          onChange={onChange}
          aria-label="Shipping method"
          className="mt-6 space-y-6"
        >
          {SHIPPING_METHODS.map((method: ShippingMethod) => (
            <Field key={method.id} className="flex items-baseline gap-2">
              <Radio
                value={method.id}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-600"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <div>
                <Label className="text-sm text-black">
                  {method.label} (${method.cost})
                </Label>
              </div>
            </Field>
          ))}
        </RadioGroup>
        <input type="hidden" name="shippingMethodId" value={selectedMethodId} />
      </div>
    </section>
  );
}
