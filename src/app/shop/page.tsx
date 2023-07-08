import Products from "@/components/products";

export const metadata = {
  title: "rtklink | Shop",
  description: "Your positioning partner in the field",
};
export default function Shop() {
  return (
    <section className="pt-8">
      <h1 className="text-center text-xl font-semibold">Shop</h1>
      <Products />
    </section>
  );
}
