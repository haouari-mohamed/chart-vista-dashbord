
import { useState, useEffect } from "react";
import { ApiService } from "@/services/api-service";
import { ChartWrapper } from "./chart-wrapper";

export function Dashboard() {
  const [lineData, setLineData] = useState<any>(null);
  const [areaData, setAreaData] = useState<any>(null);
  const [multiLineData, setMultiLineData] = useState<any>(null);
  const [barData, setBarData] = useState<any>(null);
  const [pieData, setPieData] = useState<any>(null);
  const [data3D, setData3D] = useState<any>(null);
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const [gaugeData, setGaugeData] = useState<number | null>(null);
  const [bubbleData, setBubbleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all data in parallel
        const [
          tempData,
          humidityData,
          multiMetricsData,
          categoryData,
          pieSeries,
          threeDData,
          heatmap,
          gauge,
          bubble,
        ] = await Promise.all([
          ApiService.fetchTemperatureData(),
          ApiService.fetchHumidityData(),
          ApiService.fetchMultipleMetrics(),
          ApiService.fetchCategoryData(),
          ApiService.fetchPieData(),
          ApiService.fetch3DData(),
          ApiService.fetchHeatmapData(),
          ApiService.fetchGaugeData(),
          ApiService.fetchBubbleData(),
        ]);

        // Set line chart data
        setLineData({
          x: tempData.map((d: any) => d.date),
          y: tempData.map((d: any) => d.value),
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "rgba(59, 130, 246, 0.8)" },
          line: { shape: "spline", smoothing: 1.3 },
          name: "Temperature (°C)",
        });

        // Set area chart data
        setAreaData({
          x: humidityData.map((d: any) => d.date),
          y: humidityData.map((d: any) => d.value),
          type: "scatter",
          mode: "lines",
          fill: "tozeroy",
          line: { shape: "spline", smoothing: 1.3 },
          fillcolor: "rgba(16, 185, 129, 0.2)",
          marker: { color: "rgb(16, 185, 129)" },
          name: "Humidity (%)",
        });

        // Set multi-line chart data
        setMultiLineData(
          multiMetricsData.map((series: any, index: number) => {
            const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
            return {
              x: series.data.map((d: any) => d.date),
              y: series.data.map((d: any) => d.value),
              type: "scatter",
              mode: "lines",
              name: series.name,
              line: {
                shape: "spline",
                smoothing: 1.3,
                color: colors[index % colors.length],
              },
            };
          })
        );

        // Set bar chart data
        setBarData({
          x: categoryData.map((d: any) => d.category),
          y: categoryData.map((d: any) => d.value),
          type: "bar",
          marker: {
            color: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
          },
        });

        // Set pie chart data
        setPieData({
          values: pieSeries.map((d: any) => d.value),
          labels: pieSeries.map((d: any) => d.category),
          type: "pie",
          marker: {
            colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
          },
        });

        // Set 3D surface data
        setData3D({
          z: threeDData.z,
          x: threeDData.x,
          y: threeDData.y,
          type: "surface",
          colorscale: "Viridis",
        });

        // Set heatmap data
        setHeatmapData({
          z: heatmap.z,
          x: heatmap.x,
          y: heatmap.y,
          type: "heatmap",
          colorscale: "Viridis",
        });

        // Set gauge data
        setGaugeData(gauge);

        // Set bubble chart data
        const bubbleCategories = [...new Set(bubble.map((d: any) => d.category))];
        const bubbleColors = { A: "#3b82f6", B: "#10b981", C: "#f59e0b", D: "#8b5cf6" };
        
        const bubblesByCategory = bubbleCategories.map(cat => {
          const items = bubble.filter((d: any) => d.category === cat);
          return {
            x: items.map((d: any) => d.x),
            y: items.map((d: any) => d.y),
            mode: "markers",
            marker: {
              size: items.map((d: any) => d.size),
              color: bubbleColors[cat as keyof typeof bubbleColors],
              opacity: 0.7,
            },
            name: `Group ${cat}`,
            type: "scatter",
          };
        });
        
        setBubbleData(bubblesByCategory);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading charts...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartWrapper
            title="Temperature Trends"
            chartType="Line Chart"
            data={[lineData]}
            layout={{
              autosize: true,
              showlegend: false,
              xaxis: { title: "Date" },
              yaxis: { title: "Temperature (°C)" },
            }}
          />
        </div>
        <div>
          <ChartWrapper
            title="Humidity Levels"
            chartType="Area Chart"
            data={[areaData]}
            layout={{
              autosize: true,
              showlegend: false,
              xaxis: { title: "Date" },
              yaxis: { title: "Humidity (%)" },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="line-charts">
        <ChartWrapper
          title="Combined Metrics"
          chartType="Multi-Line Chart"
          data={multiLineData || []}
          layout={{
            autosize: true,
            showlegend: true,
            legend: { orientation: "h", y: -0.2 },
            xaxis: { title: "Date" },
            yaxis: { title: "Value" },
          }}
        />
        <ChartWrapper
          title="Category Performance"
          chartType="Bar Chart"
          data={[barData]}
          layout={{
            autosize: true,
            showlegend: false,
            xaxis: { title: "Category" },
            yaxis: { title: "Value" },
          }}
          id="bar-charts"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="pie-charts">
        <ChartWrapper
          title="Distribution Analysis"
          chartType="Pie Chart"
          data={[pieData]}
          layout={{
            autosize: true,
            showlegend: true,
            legend: { orientation: "h", y: -0.2 },
          }}
        />
        <ChartWrapper
          title="Bubble Analysis"
          chartType="Bubble Chart"
          data={bubbleData || []}
          layout={{
            autosize: true,
            showlegend: true,
            legend: { orientation: "h", y: -0.2 },
            xaxis: { title: "X Value" },
            yaxis: { title: "Y Value" },
          }}
          id="scatter-charts"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="heatmap-charts">
        <ChartWrapper
          title="Weekly Activity Heatmap"
          chartType="Heatmap"
          data={[heatmapData]}
          layout={{
            autosize: true,
            xaxis: { title: "Day of Week" },
            yaxis: { title: "Hour of Day" },
          }}
        />
        <ChartWrapper
          title="System Performance"
          chartType="Gauge Chart"
          data={[
            {
              type: "indicator",
              mode: "gauge+number",
              value: gaugeData,
              gauge: {
                axis: { range: [0, 100] },
                bar: { color: "#10b981" },
                steps: [
                  { range: [0, 25], color: "#ef4444" },
                  { range: [25, 75], color: "#f59e0b" },
                  { range: [75, 100], color: "#10b981" },
                ],
              },
            },
          ]}
          layout={{
            autosize: true,
            margin: { t: 25, r: 25, l: 25, b: 25 },
          }}
          id="3d-gauge-charts"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChartWrapper
          title="3D Surface Visualization"
          chartType="3D Surface"
          data={[data3D]}
          layout={{
            autosize: true,
            scene: {
              xaxis: { title: "X Axis" },
              yaxis: { title: "Y Axis" },
              zaxis: { title: "Z Axis" },
            },
            margin: { t: 30, r: 30, l: 30, b: 30 },
          }}
          className="h-[500px]"
        />
      </div>
    </div>
  );
}
