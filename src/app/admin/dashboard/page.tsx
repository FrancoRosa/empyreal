"use client";

import { useGlobalContext } from "@/context/store";
import { getProducts } from "@/js/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const { auth } = useGlobalContext();

  const { push } = useRouter();
  const [products, setProducts] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [targetProd, setTargetProd] = useState<any>({});
  if (!auth) {
    push("/");
  }

  const handleEdit = (product: any) => {
    setTargetProd(product);
    setEdit(true);
  };

  useEffect(() => {
    if (auth) {
      getProducts().then((res) => {
        setProducts(res.data);
      });
      //TODO:

      //Add Ediding option (Desplegable)
      //Add Product
      //Add Image
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-24em)]">
      {auth && (
        <div>
          <h1 className="text-center mb-4 text-gray-700 uppercase font-bold text-xl  dark:bg-gray-700 dark:text-gray-400">
            Products
          </h1>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-1">
                    Item
                  </th>
                  <th scope="col" className="px-2 py-1">
                    Product name
                  </th>
                  <th scope="col" className="px-2 py-1">
                    Description
                  </th>
                  <th scope="col" className="px-2 py-1">
                    Images
                  </th>
                  <th scope="col" className="px-2 py-1">
                    Stock
                  </th>
                  <th scope="col" className="px-2 py-1">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any, index: number) => (
                  <>
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer text-xs"
                      onClick={() => {
                        handleEdit(product);
                      }}
                    >
                      <td className="px-2 py-1">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.name_en}
                      </th>
                      <td className="px-2 py-1">{product.des_en}</td>
                      <td className="px-2 py-1">{product.images.length}</td>
                      <td className="px-2 py-1">{product.stock}</td>
                      <td className="px-2 py-1 text text-right">
                        {product.price}
                      </td>
                    </tr>
                    {edit && product.id === targetProd.id && (
                      <tr>
                        <td className="py-6" colSpan={6}>
                          <h3 className="text-center">{targetProd.name_en}</h3>
                          <div className="flex justify-around w-60">
                            <button className="hover:bg-cyan-700 bg-cyan-500 text-white px-4 py-2 rounded-lg w-28">
                              Save
                            </button>
                            <button className="hover:bg-red-700 bg-red-500 text-white px-4 py-2 rounded-lg w-28">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
