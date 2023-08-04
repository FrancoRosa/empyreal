import { useState } from "react";

export const EditProduct = ({ product }: { product: any }) => {
  const [form, setForm] = useState({ ...product });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setForm((f: any) => ({ ...f, [id]: value }));
  };
  return (
    <>
      <form className="border border-red-400 px-8 flex-col flex text-sm">
        <div className="inline-flex">
          <p className="w-24 font-semibold">Name: </p>
          <input
            className="w-96"
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="inline-flex">
          <label className="w-24 font-semibold align-top">Description: </label>
          <textarea
            rows={5}
            cols={50}
            id="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="inline-flex">
          <label className="w-24 font-semibold">Price: </label>
          <input
            className="w-96"
            type="number"
            id="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="inline-flex">
          <label className="w-24 font-semibold">Stock: </label>
          <input
            className="w-96"
            type="number"
            id="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
        <div className="inline-flex">
          <label className="w-24 font-semibold">Datasheet: </label>
          <input
            className="w-96"
            type="text"
            id="datasheet"
            value={form.datasheet}
            onChange={handleChange}
          />
        </div>
        <div className="inline-flex">
          <label className="w-24 font-semibold">Manual: </label>
          <input
            className="w-96"
            type="text"
            id="manual"
            value={form.manual}
            onChange={handleChange}
          />
        </div>
      </form>
      <pre className="text-xs font-mono overflow-hidden w-screen">
        {JSON.stringify(product, null, 2)}
      </pre>
    </>
  );
};

export default EditProduct;
