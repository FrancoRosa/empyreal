"use client";

import {
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsLink45Deg,
} from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";

import Image from "next/image";
import antenna_img from "../../public/img/prod/antenna.png";
import boards_img from "../../public/img/prod/boards.png";
import case_img from "../../public/img/prod/case.png";
import { useState } from "react";
import Footer from "@/components/footer";
import Brand from "@/components/brand";
import Navbar from "@/components/navbar";
import Products from "@/components/products";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800">
        <section className="min-h-screen">
          <Navbar />
          <div className="text-center p-10">
            <div className="w-full flex justify-center">
              <Brand size="text-5xl" />
            </div>

            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto dark:text-gray-300">
              RTKLink is a pioneering company specializing in the development of
              cutting-edge tracking and reporting software, aimed at enhancing
              efficiency in the construction and transportation industries. With
              a strong focus on innovation, RTKLink has successfully positioned
              itself as a global leader in this field. By leveraging our
              advanced technology solutions, we empower businesses to optimize
              their operations, streamline processes, and ultimately maximize
              productivity.
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600">
            <a href="#">
              <AiFillTwitterCircle />
            </a>
            <a href="#">
              <AiFillLinkedin />
            </a>
            <a href="#">
              <AiFillYoutube />
            </a>
          </div>
        </section>
        <section>
          <div>
            <h3 className="text-3xl pt-10 text-center"> Services we offer</h3>
            <p className="text-md py-2 leading-8 text-gray-800 text-center">
              In addition to providing highly accurate tracking hardware with
              precision up to 8mm, we specialize in tailoring our tracking tools
              to meet the specific requirements of our clients in various
              industries such as mining and construction. Our extensive
              expertise and experience enable us to customize our solutions to
              perfectly align with your unique needs. The testimonials and
              success stories from our valued clients in the construction field
              serve as undeniable proof of our ability to deliver exceptional
              results.
            </p>
          </div>
        </section>
        <Products />
        <section>
          <div>
            <h3 className="text-3xl py-1">Portofolio</h3>
            <p className="text-md py-2 leading-8 text-gray-800">
              Since the begining of my journew as a freelancer develiper, I have
              done may
              <span className="text-teal-500"> projects </span>
              and got the chanse to solve
              <span className="text-teal-500"> problems</span>, bra, bra bla.
              Since the begining of my journew as a freelancer develiper, I have
              done may
              <span className="text-teal-500"> projects </span>
              and got the chanse to solve
              <span className="text-teal-500"> problems</span>, bra, bra bla
            </p>
            <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
              <div className="basis-1/3 flex-1">
                <Image
                  className="rounded-lg object-cover"
                  src={antenna_img}
                  alt="product image"
                />
              </div>
              <div className="basis-1/3 flex-1">
                <Image
                  className="rounded-lg object-cover"
                  src={case_img}
                  alt="product image"
                />
              </div>
              <div className="basis-1/3 flex-1">
                <Image
                  className="rounded-lg object-cover"
                  src={boards_img}
                  alt="product image"
                />
              </div>
              <div className="basis-1/3 flex-1">
                <Image
                  className="rounded-lg object-cover"
                  src={antenna_img}
                  alt="product image"
                />
              </div>
              <div className="basis-1/3 flex-1">
                <Image
                  className="rounded-lg object-cover"
                  src={case_img}
                  alt="product image"
                />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
