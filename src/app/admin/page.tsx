import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData } from "@/lib/portfolio";
import { getContactMessages, getUnreadContactCount } from "@/lib/contacts";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const [data, messages, unread] = await Promise.all([
    getPortfolioData(),
    getContactMessages(),
    getUnreadContactCount(),
  ]);
  return (
    <AdminDashboard
      initialData={data}
      initialMessages={messages}
      initialUnread={unread}
    />
  );
}
