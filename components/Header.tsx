import Image from "next/image";
import Link from "next/link";
import Linkedin from "./Linkedin";
import Github from "./Github";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link
        href="/"
        className="flex space-x-3 text-3xl w-full h-full text-center justify-center"
      >
        📚
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          BookMatch AI
        </h1>
      </Link>
      <div className="flex space-x-4 pb-4 sm:pb-0">
        <Link
          href="https://www.linkedin.com/in/kareemgameel"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin />
        </Link>

        <Link
          href="https://github.com/kareem-g/BookMatchAI"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </Link>
      </div>
    </header>
  );
}
