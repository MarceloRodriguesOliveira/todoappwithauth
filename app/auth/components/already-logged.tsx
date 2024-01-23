"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoggedPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/private");
  }, [router]);

  return <div>Redirecionando...</div>;
}
