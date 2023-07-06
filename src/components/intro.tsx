import Brand from "./brand";

export default function Intro() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-cyan-50">
      <div className="w-full flex justify-center">
        <Brand size="text-5xl" />
      </div>

      <p className="text-center text-md py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto dark:text-gray-300">
        We are a pioneering company specializing in the development of
        cutting-edge tracking and reporting software, aimed at enhancing
        efficiency in the construction and transportation industries. With a
        strong focus on innovation,
        <span className="text-cyan-800"> rtklink </span>has successfully
        positioned itself as a global leader in this field. By leveraging our
        advanced technology solutions, we empower businesses to optimize their
        operations, streamline processes, and ultimately maximize productivity.
      </p>
    </section>
  );
}
