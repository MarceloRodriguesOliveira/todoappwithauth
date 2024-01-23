import { useRouter } from "next/navigation";
import { LoginForm } from "../components/form-login";
import LoggedPage from "../components/already-logged";
import { getServerSession } from "next-auth";
export default async function LoginPage() {
  const session = await getServerSession();

  const router = useRouter;

  return (
    <div className="h-screen flex items-center justify-center">
      {session ? <LoggedPage /> : <LoginForm />}
    </div>
  );
}
