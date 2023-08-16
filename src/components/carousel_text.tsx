"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const CarouselText = ({
  images = [],
  style = "",
}: {
  images: any;
  style: string;
}) => {
  const [show, setShow] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow((s) => s + 1);
      if (show + 1 >= images.length) {
        setShow(0);
      }
    }, 7000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div className={"relative " + style}>
      <Image
        alt="product image"
        src={images[show].img}
        className="h-[300px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <p className="text-center absolute bottom-4 text-cyan-600 z-10 w-full">
        {images[show].text}
      </p>
    </div>
  );
};
export default CarouselText;
