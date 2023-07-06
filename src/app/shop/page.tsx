import Products from "@/components/products";

export const metadata = {
  title: "rtklink | Shop",
  description: "Your positioning partner in the field",
};
export default function Shop() {
  return (
    <>
      <h1 className="text-center">Shop</h1>
      <Products />
    </>
  );
}
