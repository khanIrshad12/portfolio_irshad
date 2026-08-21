import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData } from "@/lib/portfolio";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await getPortfolioData();
  return <AdminDashboard initialData={data} />;
}
