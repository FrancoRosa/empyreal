import Brand from "@/components/brand";

async function getData(order_id: string) {
  const res = await fetch(`http:localhost:3000/api/orders/${order_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({
  params,
}: {
  params: { order_id: string };
}) {
  const order = await getData(params.order_id);
  const data = order[0];
  return (
    <main>
      {data ? (
        <div>
          <div className="flex justify-center w-full">
            <Brand size="text-4xl" />
          </div>
          <h1 className="py-2 uppercase text-center font-bold text-xl">
            Invoice
          </h1>

          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Client:</p>
              <p>{data.name}</p>
              <p>{data.company}</p>
              <p>{data.address}</p>
              <p>
                {data.city}, {data.postal}
              </p>
              <p>{data.phone}</p>
              <p>{data.email}</p>
            </div>
            <div>
              <p className="font-semibold">Order information:</p>
              <table>
                <tr>
                  <td>Number:</td>
                  <td className="text-right px-4">{params.order_id}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td className="text-right px-4">
                    {data.created_at.split("T")[0].replaceAll("-", "/")}
                  </td>
                </tr>
                <tr>
                  <td>Time:</td>
                  <td className="text-right px-4">
                    {data.created_at.split("T")[1].split(".")[0]}
                  </td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td className="text-right px-4">{data.status}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="relative overflow-x-auto py-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Unit price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                {data.order.map((i: any, index: number) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i.name.en}
                    </th>
                    <td className="px-6 py-4">{i.quantity}</td>
                    <td className="px-6 py-4">{i.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-left">
                      {(i.quantity * i.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <th
                    scope="row"
                    className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Shipping
                  </th>

                  <td className="px-6 py-4 text-left">
                    {(
                      data.value -
                      data.order.reduce((s, o) => s + o.quantity * o.price, 0)
                    ).toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-gray-100 dark:bg-gray-800 border-t border-y-gray-200">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <th
                    scope="row"
                    className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total
                  </th>

                  <td className="px-6 py-4 text-left">
                    {data.value.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center py-6">Order #{params.order_id} not found</p>
      )}
      {/* <p className="text-center font-mono text-xs mt-8">
        _________ result from call _________
      </p>
      <pre className="font-mono text-xs">{JSON.stringify(data, null, 2)}</pre> */}
    </main>
  );
}
