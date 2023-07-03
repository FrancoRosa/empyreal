import { BsFillMoonStarsFill } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";

import Image from "next/image";
import antenna from "../../public/img/prod/antenna.png";

export default function Home() {
  return (
    <main className="bg-white px-10">
      <section className="min-h-screen">
        <nav className="py-10 mb-12 flex justify-between">
          <h1 className="text-xl font-burtons">RTKLink</h1>
          <ul className="flex items-center">
            <li>
              <BsFillMoonStarsFill className="cursor-pointer text-2xl" />
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
          <h2 className="text-5xl py-2 text-teal-600 font-medium">
            Dimitri Marco
          </h2>
          <h3 className="text-2xl py-2">Developer and designer.</h3>
          <p className="text-md py-5 leading-8 text-gray-800">
            Freelancer prodiunbkja akjsdhakjd askjdhasdh kjhasjhasdh khkajsdhj{" "}
            Freelancer prodiunbkja akjsdhakjd askjdhasdh kjhasjhasdh khkajsdhj{" "}
            Freelancer prodiunbkja akjsdhakjd askjdhasdh kjhasjhasdh khkajsdhj{" "}
          </p>
        </div>
        <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600">
          <AiFillTwitterCircle />
          <AiFillLinkedin />
          <AiFillYoutube />
        </div>
        <div className="bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 mx-auto">
          <Image src={antenna} alt="calibrated antenna" />
        </div>
      </section>
    </main>
  );
}
