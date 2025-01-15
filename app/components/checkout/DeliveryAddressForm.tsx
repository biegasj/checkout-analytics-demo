import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";

interface DeliveryAddressFormProps {
  errors: Record<string, string> | null;
}

export default function DeliveryAddressForm({
  errors,
}: DeliveryAddressFormProps) {
  return (
    <section>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-lg font-semibold text-gray-900">
          Delivery Address
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Fill in the delivery address.
        </p>
        <Fieldset className="mt-10 w-full grid grid-cols-2 gap-x-6 gap-y-6">
          <div className="grid grid-cols-1 gap-4 col-span-2">
            <Field>
              <Label className="block text-sm font-medium text-gray-900">
                E-mail address
              </Label>
              <Input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                name="email"
                type="email"
              />
              {errors?.email && (
                <Description className="mt-1 text-red-600 text-sm">
                  {errors.email}
                </Description>
              )}
            </Field>
          </div>
          <Field>
            <Label className="block text-sm font-medium text-gray-900">
              First name
            </Label>
            <Input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              name="firstName"
            />
            {errors?.firstName && (
              <Description className="mt-1 text-red-600 text-sm">
                {errors.firstName}
              </Description>
            )}
          </Field>
          <Field>
            <Label className="block text-sm font-medium text-gray-900">
              Last name
            </Label>
            <Input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              name="lastName"
            />
            {errors?.lastName && (
              <Description className="mt-1 text-red-600 text-sm">
                {errors.lastName}
              </Description>
            )}
          </Field>
          <Field>
            <Label className="block text-sm font-medium text-gray-900">
              Country
            </Label>
            <Select
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              name="country"
            >
              <option>Canada</option>
              <option>United States</option>
              <option>Mexico</option>
            </Select>
          </Field>
          <Field>
            <Label className="block text-sm font-medium text-gray-900">
              Street address
            </Label>
            <Input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              name="street"
            />
            {errors?.street && (
              <Description className="mt-1 text-red-600 text-sm">
                {errors.street}
              </Description>
            )}
          </Field>
          <div className="grid grid-cols-3 gap-4 col-span-2">
            <Field>
              <Label className="block text-sm font-medium text-gray-900">
                City
              </Label>
              <Input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                name="city"
              />
              {errors?.city && (
                <Description className="mt-1 text-red-600 text-sm">
                  {errors.city}
                </Description>
              )}
            </Field>
            <Field>
              <Label className="block text-sm font-medium text-gray-900">
                State/Province
              </Label>
              <Input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                name="province"
              />
              {errors?.province && (
                <Description className="mt-1 text-red-600 text-sm">
                  {errors.province}
                </Description>
              )}
            </Field>
            <Field>
              <Label className="block text-sm font-medium text-gray-900">
                ZIP/Postal code
              </Label>
              <Input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                name="zipCode"
              />
              {errors?.zipCode && (
                <Description className="mt-1 text-red-600 text-sm">
                  {errors.zipCode}
                </Description>
              )}
            </Field>
          </div>
        </Fieldset>
      </div>
    </section>
  );
}
