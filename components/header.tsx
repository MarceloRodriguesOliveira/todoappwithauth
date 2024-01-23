import Link from "next/link";
import { SignOutButton } from "./sign-out-button";
import { getServerSession } from "next-auth";
import { GrTask } from "react-icons/gr";

const Header = async () => {
  const session = await getServerSession();

  return (
    <header className="w-full h-20 flex items-center bg-violet-400 text-slate-50">
      <nav className="w-full flex items-center justify-between m-auto max-w-screen-xl text-xl font-semibold">
        <Link href="/">TodoApp</Link>
        <ul className="flex items-center gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/private">Tarefas</Link>
          </li>
          {session && (
            <li>
              <SignOutButton>Sair</SignOutButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
