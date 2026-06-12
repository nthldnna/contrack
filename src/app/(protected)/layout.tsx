import Sidebar from "@/src/app/components/Sidebar";
import { requireUser } from "@/src/lib/auth/requireUser";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await requireUser();

  const userName = profile?.name || user?.email || "User";

  return (
    <div className="flex">
      <Sidebar userName={userName} />

      <main className="md:ml-72 pt-16 md:pt-6 p-6 w-full">
        {children}
      </main>
    </div>
  );
}