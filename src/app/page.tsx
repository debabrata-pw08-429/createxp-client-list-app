"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl md:text-7xl font-extrabold mb-8 text-blue-600">
        Welcome to Client List App
      </h1>

      <PrimaryButton onClick={() => router.push("/clients")}>
        Go to Clients List Page
      </PrimaryButton>
    </div>
  );
}
