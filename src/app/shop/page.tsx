import Products from "@/components/products";

export const metadata = {
  title: "empyreal | Shop",
  description: "Your positioning partner in the field",
};
export default function Shop() {
  return (
    <section className="pt-8">
      <h1 className="text-3xl mt-10 font-semibold text-cyan-600 text-center">
        Shop
      </h1>
      <Products />
    </section>
  );
}
