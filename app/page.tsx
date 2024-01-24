import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full  sm:h-[80vh] flex flex-col sm:flex-col items-center m-auto sm:m-0 border  md:flex-row md:h-4/6">
      <div className="w-96  flex flex-col justify-center items-center p-6 sm:mt-6 min-w-[350px] sm:w-3/6   ">
        <h1 className="text-3xl font-bold mb-4 ">Comece Agora!</h1>
        <button className="rounded w-28 p-2 bg-violet-400 text-white font-medium text-xl">
          <Link href="/private">Login</Link>
        </button>
      </div>
      <div className="h-96 sm:w-3/6 md:h-screen md:w-full  bg-[url('../public/img/to-do-list.svg')] bg-contain bg-center bg-no-repeat min-w-[360px]"></div>
    </div>
  );
}
