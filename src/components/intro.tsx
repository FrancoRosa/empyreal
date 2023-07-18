"use client";
import { getLang } from "@/js/helpers";
import Brand from "./brand";
import { images } from "@/js/images";
import Carousel from "./carousel";
import Link from "next/link";

const text: any = {
  intro1: {
    en: "We are a pioneering company specializing in the development of cutting-edge tracking and reporting software, aimed at enhancing efficiency in the construction and transportation industries. With a strong focus on innovation.",
    es: "Somos una empresa pionera especializada en el desarrollo de software de seguimiento y reporte de vanguardia, enfocado en mejorar la eficiencia en las industrias de construcción y transporte. Con un fuerte enfoque en la innovación.",
  },
  intro2: {
    en: "has successfully positioned itself as a global leader in this field. By leveraging our advanced technology solutions, we empower businesses to optimize their operations, streamline processes, and ultimately maximize productivity.",
    es: "se ha posicionado exitosamente como líder mundial en este campo. Al aprovechar nuestras soluciones tecnológicas avanzadas, potenciamos a las empresas para optimizar sus operaciones, agilizar los procesos y, en última instancia, maximizar la productividad.",
  },
  solutions: {
    en: "Our Solutions",
    es: "Soluciones",
  },
  boards: {
    en: "Development boards",
    es: "Tarjetas de desarrollo",
  },
  antennas: {
    en: "Antennas and accessories",
    es: "Antenas y accesorios",
  },
  software: {
    en: "Software and displays",
    es: "Software y pantallas",
  },
};

export default function Intro() {
  const lang = getLang();
  return (
    <section className=" flex flex-col justify-center items-center">
      <div className="w-full flex justify-center">
        <Brand size="text-5xl" />
      </div>

      <p className="text-center text-md px-8 py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto dark:text-gray-300">
        {text.intro1[lang]}
        <span className="text-cyan-700"> rtklink </span>
        {text.intro2[lang]}
      </p>
      <h3 className="text-2xl  mt-10">{text.solutions[lang]}</h3>
      <div className="flex items-center flex-col lg:flex-row lg:justify-between lg:items-baseline lg:w-full">
        <div className="flex flex-col items-center">
          <p className="text-semibold py-4">{text.boards[lang]}</p>
          <Link href="/shop">
            <Carousel
              images={[images.boards, images.case, images.ublox]}
              style="w-40 h-40 object-cover"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-semibold py-4">{text.antennas[lang]}</p>
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
          <p className="text-semibold py-4">{text.software[lang]}</p>
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
