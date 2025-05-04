
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";

interface ChartWrapperProps {
  title: string;
  chartType: string;
  data: any[];
  layout: any;
  config?: any;
  className?: string;
}

export function ChartWrapper({
  title,
  chartType,
  data,
  layout,
  config = {},
  className,
}: ChartWrapperProps) {
  const { theme } = useTheme();
  const [chartLayout, setChartLayout] = useState(layout);
  
  useEffect(() => {
    setChartLayout({
      ...layout,
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: {
        color: theme === "dark" ? "#e1e1e1" : "#333333",
      },
      margin: { t: 10, r: 10, l: 50, b: 50 },
    });
  }, [theme, layout]);

  return (
    <Card className={`dashboard-card ${className}`}>
      <CardHeader className="dashboard-card-header">
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-muted-foreground">{chartType}</div>
      </CardHeader>
      <CardContent className="dashboard-card-content p-0">
        <div className="chart-container">
          <Plot
            data={data}
            layout={chartLayout}
            config={{
              responsive: true,
              displayModeBar: false,
              ...config,
            }}
            style={{ width: "100%", height: "100%" }}
            useResizeHandler={true}
          />
        </div>
      </CardContent>
    </Card>
  );
}
