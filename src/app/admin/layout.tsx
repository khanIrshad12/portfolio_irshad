import { isAuthenticated } from "@/lib/auth";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  return (
    <div className={`admin-root ${authed ? "" : "flex min-h-screen items-center justify-center"}`}>
      {children}
    </div>
  );
}
