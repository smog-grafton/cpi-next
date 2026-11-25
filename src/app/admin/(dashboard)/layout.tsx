import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/server/auth";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) { const session = await getAdminSession(); if (!session?.user) redirect("/admin/login"); return <div className="admin-shell"><AdminSidebar session={session} /><main className="admin-main" id="main-content">{children}</main></div>; }
