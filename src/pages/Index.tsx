
import { Sidebar } from "@/components/dashboard/sidebar";
import { Dashboard } from "@/components/dashboard/dashboard";

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Interactive visualization of key metrics and analytics
            </p>
          </header>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
