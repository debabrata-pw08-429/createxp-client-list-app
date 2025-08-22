import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="w-full mx-auto p-6">{children}</main>
    </div>
  );
}
