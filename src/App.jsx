import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "@/lib/state";
import { MainLayout } from "@/components/layout/MainLayout";
import { OverviewPage } from "@/pages/user/OverviewPage";
import { TransactionsPage } from "@/pages/user/TransactionsPage";
import { InsightsPage } from "@/pages/user/InsightsPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminTransactionsPage } from "@/pages/admin/AdminTransactionsPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <div className="p-10 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">An unexpected error occurred.</p>
        <a href="/" className="text-primary underline">
          Go home
        </a>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <OverviewPage />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/insights",
        element: <InsightsPage />,
      },
      {
        path: "/admin",
        element: <AdminDashboardPage />,
      },
      {
        path: "/admin/transactions",
        element: <AdminTransactionsPage />,
      },
      {
        path: "*",
        element: (
          <div className="p-10 text-center space-y-3">
            <h2 className="text-3xl font-bold">404</h2>
            <p className="text-muted-foreground">Page not found.</p>
            <a href="/" className="text-primary underline">
              Return home
            </a>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <main className="min-h-screen bg-background text-foreground">
        <RouterProvider router={appRouter} />
      </main>
    </AppProvider>
  );
}

export default App;