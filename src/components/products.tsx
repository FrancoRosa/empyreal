import Image from "next/image";
import antenna_img from "../../public/img/prod/antenna.png";
import antenna1_img from "../../public/img/prod/antenna1.png";
import boards_img from "../../public/img/prod/boards.png";
import case_img from "../../public/img/prod/case.png";
import coffee_img from "../../public/img/prod/coffee.png";
import stream_img from "../../public/img/prod/stream.png";
const Products = () => {
  const products = [
    {
      name: "RTK enabled tracking board",
      description:
        "Tracking element to achive centimer level accuracy, USB based ready to connect to any display or software",
      image: boards_img,
    },
    {
      name: "GNSS Antenna",
      description:
        "The GNSS antenna is engineered to provide high-quality reception of satellite signals, even in challenging environments. Its compact and rugged design allows for easy installation on various platforms, including vehicles, buildings, and surveying equipment",
      image: antenna1_img,
    },
    {
      name: "Correction stream 1 month",
      description:
        "Stand alone hardware can provide up meter level accuracy to improve this a correction stream from a static base is required then cm level accuracy is achieved",
      image: boards_img,
    },
    {
      name: "Coffee",
      description:
        "Keep your boss happy by giving some coffee from time to time, buy high quality coffee here",
      image: coffee_img,
    },
    {
      name: "Stream",
      description:
        "Keep your boss happy by giving some coffee from time to time, buy high quality coffee here",
      image: stream_img,
    },
  ];
  return (
    <section className="lg:flex gap-10">
      {/* <div className="bg-gradient-to-b from-teal-500  dark:to-red-300 rounded-full w-80 h-80 mt-20 mx-auto md:h-96 md:w-96 p-4">
        <Image src={antenna_img} alt="calibrated antenna" className="" />
      </div> */}
      {products.map((product, index) => (
        <div
          key={index}
          className="text-center shadow-lg p-10 rounded-xl my-10"
        >
          <Image
            src={product.image}
            alt="board"
            className="mx-auto  h-40 w-auto"
          />
          <h3 className="text-lg font-medium pt-8 pb-2">{product.name}</h3>
          <p className="py-2">{product.description}</p>
          <button className="bg-cyan-500 text-white rounded-lg py-2 px-4 font-bold hover:bg-teal-600">
            Add to card
          </button>
        </div>
      ))}
    </section>
  );
};
export default Products;
