import { isAuthenticated } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {authed && <AdminNav />}
      {children}
    </div>
  );
}
