import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Deal Feed" },
  { href: "/copilot", label: "Flip Copilot" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/market", label: "Market Intelligence" },
  { href: "/reports", label: "Daily Reports" },
  { href: "/alerts", label: "Alerts" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
  { href: "/billing", label: "Billing" },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border bg-card p-4">
      <div className="mb-6 px-2 text-lg font-bold">FlipSignal AI</div>
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border pt-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
