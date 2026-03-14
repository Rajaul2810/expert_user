import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pt-14">
      <DashboardSidebar />
      <main className="lg:pl-64">
        {children}
      </main>
    </div>
  )
}
