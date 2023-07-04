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

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="flex items-center font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-300 font-nasa">
              <span>rtk</span>
              <BsLink45Deg className="font-extrabold text-2xl text-cyan-500" />
              <span>link</span>
            </h1>
            <ul className="flex items-center">
              <li>
                {darkMode ? (
                  <BsFillSunFill
                    className="cursor-pointer text-2xl text-white"
                    onClick={() => setDarkMode((s) => !s)}
                  />
                ) : (
                  <BsFillMoonStarsFill
                    className="cursor-pointer text-2xl "
                    onClick={() => setDarkMode((s) => !s)}
                  />
                )}
              </li>
              <li>
                <a
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
                  href="#"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10">
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              Dimitri Marco
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl">
              Developer and designer.
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto dark:text-gray-300">
              Freelancer prodiunbkja akjsdhakjd askjdhasdh kjhasjhasdh khkajsdhj
              Freelancer prodiunbkja akjsdhakjd askjdhasdh kjhasjhasdh khkajsdhj
              Freelancer prodiunbkja akjsdhakjd askjdhasdh kjhasjhasdh khkajsdhj
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600">
            <AiFillTwitterCircle />
            <AiFillLinkedin />
            <AiFillYoutube />
          </div>
          <div className="bg-gradient-to-b from-teal-500  dark:to-red-300 rounded-full w-80 h-80 mt-20 mx-auto md:h-96 md:w-96 p-4">
            <Image src={antenna_img} alt="calibrated antenna" className="" />
          </div>
        </section>
        <section>
          <div>
            <h3 className="text-3xl py-1"> Services I offer</h3>
            <p className="text-md py-2 leading-8 text-gray-800">
              Since the begining of my journew as a freelancer develiper, I have
              done may
              <span className="text-teal-500"> projects </span>
              and got the chanse to solve
              <span className="text-teal-500"> problems</span>, bra, bra bla
            </p>
            <p className="text-md py-2 leading-8 text-gray-800">
              Since the begining of my journew as a freelancer develiper, I have
              done may
              <span className="text-teal-500"> projects </span>
              and got the chanse to solve
              <span className="text-teal-500"> problems</span>, bra, bra bla
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10">
              <Image
                src={boards_img}
                alt="board"
                className="mx-auto  h-40 w-auto"
              />
              <h3 className="text-lg font-medium pt-8 pb-2">Cool boards</h3>
              <p className="py-2">
                High performance rugged boards for critical applications
              </p>
              <h4 className="py-4 text-teal-600">Applications</h4>
              <p className="text-gray-800 py-1">Nautical</p>
              <p className="text-gray-800 py-1">Construction</p>
              <p className="text-gray-800 py-1">Mining</p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10">
              <Image
                src={boards_img}
                alt="board"
                className="mx-auto  h-40 w-auto"
              />
              <h3 className="text-lg font-medium pt-8 pb-2">Cool boards</h3>
              <p className="py-2">
                High performance rugged boards for critical applications
              </p>
              <h4 className="py-4 text-teal-600">Applications</h4>
              <p className="text-gray-800 py-1">Nautical</p>
              <p className="text-gray-800 py-1">Construction</p>
              <p className="text-gray-800 py-1">Mining</p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10">
              <Image
                src={case_img}
                alt="board"
                className="mx-auto  h-40 w-auto"
              />
              <h3 className="text-lg font-medium pt-8 pb-2">Cool boards</h3>
              <p className="py-2">
                High performance rugged boards for critical applications
              </p>
              <h4 className="py-4 text-teal-600">Applications</h4>
              <p className="text-gray-800 py-1">Nautical</p>
              <p className="text-gray-800 py-1">Construction</p>
              <p className="text-gray-800 py-1">Mining</p>
            </div>
          </div>
        </section>
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
      </main>
    </div>
  );
}
