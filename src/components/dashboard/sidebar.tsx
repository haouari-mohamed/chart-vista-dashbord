
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  BarChart3,
  Gauge,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type SidebarProps = {
  className?: string;
};

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "#",
    active: true,
  },
  {
    title: "Line Charts",
    icon: LineChart,
    href: "#line-charts",
  },
  {
    title: "Bar Charts",
    icon: BarChart,
    href: "#bar-charts",
  },
  {
    title: "Pie Charts",
    icon: PieChart,
    href: "#pie-charts",
  },
  {
    title: "Scatter & Bubble",
    icon: ScatterChart,
    href: "#scatter-charts",
  },
  {
    title: "Heatmap",
    icon: BarChart3,
    href: "#heatmap-charts",
  },
  {
    title: "3D Surface & Gauge",
    icon: Gauge,
    href: "#3d-gauge-charts",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div
          className={cn(
            "text-sidebar-foreground font-semibold transition-all duration-300",
            collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
          )}
        >
          ChartVista
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="sr-only">
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
        </Button>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  item.active && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span
                  className={cn(
                    "transition-all duration-300",
                    collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
                  )}
                >
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
