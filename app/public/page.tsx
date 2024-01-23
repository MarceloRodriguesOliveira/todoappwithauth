"use client";

import { useSession } from "next-auth/react";

export default function PublicPage() {
  const { data: session } = useSession();
  return (
    <div className="w-full max-w-screen-xl h-screen flex justify-center items-center">
      <h1>Public Page</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  );
}
