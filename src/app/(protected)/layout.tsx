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
    <div className="grid-paper min-h-screen bg-paper">
      <Sidebar userName={userName} />

      <main className="md:ml-60 pt-14 md:pt-0 min-w-0">
        {children}
      </main>
    </div>
  );
}
