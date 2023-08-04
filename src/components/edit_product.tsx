import { useState } from "react";

export const EditProduct = ({ product }: { product: any }) => {
  const [form, setForm] = useState({ ...product });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };
  return (
    <>
      <form className="border border-red-400">
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={handleChange}
        />
      </form>
      <pre className="text-xs font-mono overflow-hidden w-screen">
        {JSON.stringify(product, null, 2)}
      </pre>
    </>
  );
};

export default EditProduct;
