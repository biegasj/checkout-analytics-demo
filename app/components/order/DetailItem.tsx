export const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm/6 font-medium text-gray-900">{label}</dt>
    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);
