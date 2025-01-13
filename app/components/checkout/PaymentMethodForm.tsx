import { PAYMENT_METHODS, PaymentMethod } from "~/utils/paymentMethods";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

interface PaymentMethodFormProps {
  selectedMethod: string;
  onChange: (method: string) => void;
}

export default function PaymentMethodForm({
  selectedMethod,
  onChange,
}: PaymentMethodFormProps) {
  return (
    <section>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Payment method
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Select your preferred payment method below. Your choice will be used
          to process the order.
        </p>
        <RadioGroup
          value={selectedMethod}
          onChange={onChange}
          aria-label="Payment method"
          className="mt-6 space-y-6"
        >
          {PAYMENT_METHODS.map((method: PaymentMethod) => (
            <Field key={method.id} className="flex items-baseline gap-2">
              <Radio
                value={method.id}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-600"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <div>
                <Label className="text-sm text-black">{method.label}</Label>
              </div>
            </Field>
          ))}
        </RadioGroup>
        <input type="hidden" name="paymentMethod" value={selectedMethod} />
      </div>
    </section>
  );
}
