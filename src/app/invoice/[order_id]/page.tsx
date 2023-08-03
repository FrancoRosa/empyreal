import qr from "../../../../public/img/qrcode.png";
import BrandInvoice from "@/components/brand_invoice";
import { monetize } from "@/js/helpers";
import Image from "next/image";

async function getData(order_id: string) {
  const res = await fetch(`https://rtklink.com/api/orders/${order_id}`);
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
        <div className="mt-12 mx-4 font-mono text-sm h-screen">
          <div className="flex justify-between w-full py-6 px-8">
            <BrandInvoice size="text-4xl" />
            <Image
              src={qr}
              alt="qr code to go to company web"
              className="w-20"
            />
            <div>
              <p className="font-semibold">rtklink</p>
              <p>1512 Gettysburg Ave N,</p>
              <p>Golden valley, 55427</p>
              <p>support@rtklink.com</p>
            </div>
          </div>
          <div className="flex mt-8 uppercase font-bold text-xl px-8 justify-between">
            <h1 className="text-left  ">Invoice</h1>
          </div>
          <hr className="mb-10 mx-8" />

          <div className="flex justify-between px-8">
            <div>
              <p>
                <span className="font-semibold">Client: </span>
                {data.name}
              </p>
              <p>
                <span className="font-semibold">Company: </span>
                {data.company}
              </p>
              <p className="font-semibold">Address: </p>

              <p>{data.address}</p>
              <p>
                {data.city}, {data.postal}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {data.phone}
              </p>
              <p>
                <span className="font-semibold">Email: </span>

                {data.email}
              </p>
            </div>
            <div>
              <p className="font-semibold">Order information:</p>
              <table>
                <tr>
                  <td>Number:</td>
                  <td className="text-right px-4 font-semibold">
                    {params.order_id}
                  </td>
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
                  <td className="text-right px-4">
                    {data.success ? "Authorized" : "Failed"}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="relative overflow-x-auto py-10 mx-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Quantity
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Unit price
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
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
                    <td className="px-6 py-4 text-right">{i.quantity}</td>
                    <td className="px-6 py-4 text-right">
                      {monetize(i.price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {monetize(i.quantity * i.price)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <td className="px-6 py-2"></td>
                  <td className="px-6 py-2"></td>
                  <th
                    scope="row"
                    className="text-xs uppercase font-semibold  text-right px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Shipping
                  </th>

                  <td className=" text-right px-6 py-2 ">
                    {monetize(
                      data.value -
                        data.order.reduce(
                          (s: number, o: { quantity: number; price: number }) =>
                            s + o.quantity * o.price,
                          0
                        )
                    )}
                  </td>
                </tr>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <td className="px-6 py-2"></td>
                  <td className="px-6 py-2"></td>
                  <th
                    scope="row"
                    className="text-xs uppercase font-semibold text-right px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Taxes
                  </th>

                  <td className=" text-right px-6 py-2 ">{monetize(0)}</td>
                </tr>

                <tr className="bg-gray-100 dark:bg-gray-800 border-t border-y-gray-200">
                  <td className="px-6 py-2"></td>
                  <td className="px-6 py-2"></td>
                  <th
                    scope="row"
                    className="text-xs uppercase font-semibold text-right px-6 py-2  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total
                  </th>

                  <td className="px-6 py-2 text-right">
                    {monetize(data.value)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="absolute bottom-4 right-[6em]">rtklink.com</p>
        </div>
      ) : (
        <p className="text-center py-6">Order #{params.order_id} not found</p>
      )}
    </main>
  );
}
