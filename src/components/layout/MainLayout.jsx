import { Outlet, NavLink } from "react-router-dom";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { useAppState } from "@/lib/state";

export function MainLayout() {
  const { role } = useAppState();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LoadingOverlay />
      <header className="border-b bg-card/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-semibold">
              ₹
            </span>
            <div>
              <p className="text-sm font-medium leading-tight">Finance Dashboard</p>
              <p className="text-xs text-muted-foreground">Track, understand, and improve spending</p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/insights"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              Insights
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              Admin
            </NavLink>
          </nav>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline-flex">Current role:</span>
            <span className="font-medium capitalize text-foreground">{role}</span>
            <RoleSwitcher />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <footer className="border-t py-3 text-center text-[11px] text-muted-foreground">
        Built for internship assignment – demo only, mock data, no backend.
      </footer>
    </div>
  );
}
