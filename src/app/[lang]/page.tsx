"use client";
import Intro from "@/components/intro";

export default function Home({ params }: { params: { lang: string } }) {
  return (
    <>
      <Intro params={params} />
    </>
  );
}
