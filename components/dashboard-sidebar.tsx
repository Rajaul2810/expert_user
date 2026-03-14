"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  Calendar,
  CalendarClock,
  MessageCircle,
  FileText,
  Star,
  FileStack,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navSections = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/mentees", label: "Mentees", icon: Users },
    ],
  },
  {
    label: "Appointments",
    items: [
      { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
      { href: "/dashboard/scheduled", label: "Scheduled Timings", icon: CalendarClock },
    ],
  },
  {
    label: "Activity",
    items: [
      { href: "/dashboard/messages", label: "Messages", icon: MessageCircle, badge: 3 },
      { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
      { href: "/dashboard/reviews", label: "Reviews", icon: Star },
      { href: "/dashboard/blogs", label: "Blogs", icon: FileStack },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
      { href: "/", label: "Logout", icon: LogOut },
    ],
  },
] as const

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-20 z-50 flex size-10 items-center justify-center rounded-lg border border-border bg-card shadow lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] w-64 flex-col border-r border-border bg-muted/50 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-end border-b border-border px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <div className="flex flex-col items-center border-b border-border pb-4">
            <div className="relative">
              <div className="size-16 overflow-hidden rounded-full border-2 border-primary ring-2 ring-primary/20">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
                  alt=""
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-2 font-semibold text-foreground">Charles Paterson</p>
            <p className="text-xs text-muted-foreground">Member Since 2015</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                aria-label="Settings"
              >
                <Settings className="size-4" />
              </button>
            </div>
          </div>

          <nav className="mt-4 flex flex-col gap-6">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {section.label}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = item.href === "/" ? false : pathname === item.href
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className="size-4 shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          {"badge" in item && item.badge !== undefined && (
                            <span className="flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
