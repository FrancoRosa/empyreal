import Brand from "./brand";
import { images } from "@/js/images";
import Carousel from "./carousel";
import Link from "next/link";

export const metadata = {
  title: "rtklink | Home",
  description:
    "Software, hardware and GNSS correction services. We are your positioning partner in the field",
};

export default function Intro() {
  return (
    <section className=" flex flex-col justify-center items-center">
      <div className="w-full flex justify-center py-10">
        <Brand size="text-5xl" />
      </div>

      <p className="text-center px-8 py-8 leading-8 text-gray-800 text-xl max-w-3xl mx-auto dark:text-gray-300">
        Development of cutting-edge tracking and reporting software, aimed at
        enhancing efficiency in the construction and transportation industries.
      </p>
      <p className="text-center px-8 py-5 leading-8 text-gray-800 text-xl max-w-3xl mx-auto dark:text-gray-300">
        At
        <span className="text-cyan-700"> rtklink </span> our goal is to provide
        tools to help our clients improve execution management, by accurate
        positioning machinery in the field.
      </p>

      <h3 className="text-3xl mt-10 font-semibold text-cyan-600">
        Our Solutions
      </h3>
      <div className="flex items-center flex-col lg:flex-row lg:justify-between lg:items-baseline lg:w-full">
        <div className="flex flex-col items-center">
          <p className="text-semibold py-4">Development boards</p>
          <Link href="/shop">
            <Carousel
              images={[images.boards, images.case, images.ublox]}
              style="w-40 h-40 object-cover"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-semibold py-4">Antennas and accessories</p>
          <Link href="/shop">
            <Carousel
              images={[
                images.antenna,
                images.magnetic_antenna,
                images.magnetic_mount,
                images.trimble_av28,
                images.trimble_zephyr,
              ]}
              style="w-40 h-40 object-cover"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center mb-10">
          <p className="text-semibold py-4">Software and displays</p>
          <Link href="/shop">
            <Carousel
              images={[images.dell, images.stream]}
              style="w-40 h-40 object-cover"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
