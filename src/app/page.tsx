import { BsFillMoonStarsFill } from "react-icons/bs";
export default function Home() {
  return (
    <main>
      <section className="min-h-screen">
        <nav>
          <h1>Developed by Franco</h1>
          <ul>
            <li>
              <BsFillMoonStarsFill />
            </li>
            <li>
              <a href="#">Resume</a>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}
