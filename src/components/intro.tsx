import Brand from "./brand";

const text: any = {
  intro1: {
    en: "We are a pioneering company specializing in the development of cutting-edge tracking and reporting software, aimed at enhancing efficiency in the construction and transportation industries. With a strong focus on innovation.",
    es: "Somos una empresa pionera especializada en el desarrollo de software de seguimiento y reporte de vanguardia, enfocado en mejorar la eficiencia en las industrias de construcción y transporte. Con un fuerte enfoque en la innovación.",
  },
  intro2: {
    en: "has successfully positioned itself as a global leader in this field. By leveraging our advanced technology solutions, we empower businesses to optimize their operations, streamline processes, and ultimately maximize productivity.",
    es: "se ha posicionado exitosamente como líder mundial en este campo. Al aprovechar nuestras soluciones tecnológicas avanzadas, potenciamos a las empresas para optimizar sus operaciones, agilizar los procesos y, en última instancia, maximizar la productividad.",
  },
};

export default function Intro({ params }: { params: { lang: string } }) {
  return (
    <section className="h-[calc(100vh-6em)] flex flex-col justify-center">
      <div className="w-full flex justify-center">
        <Brand size="text-5xl" />
      </div>

      <p className="text-center text-md px-8 py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto dark:text-gray-300">
        {text.intro1[params.lang]}
        <span className="text-cyan-700"> rtklink </span>
        {text.intro2[params.lang]}
      </p>
    </section>
  );
}
