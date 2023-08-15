"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Carousel = ({
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
    }, 2000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Image
      alt="product image"
      src={images[show]}
      className={
        style + " object-fill w-auto h-20 hover:bg-gray-100 hover:rounded-lg"
      }
    />
  );
};
export default Carousel;
